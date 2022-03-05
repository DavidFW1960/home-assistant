"""Support for monitoring an SABnzbd NZB client."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import timedelta
import logging

from .pysabnzbd import SabnzbdApi, SabnzbdApiException
import voluptuous as vol

from homeassistant.components import configurator
from homeassistant.components.discovery import SERVICE_SABNZBD
from homeassistant.components.sensor import SensorEntityDescription
from homeassistant.const import (
    CONF_API_KEY,
    CONF_HOST,
    CONF_NAME,
    CONF_PATH,
    CONF_PORT,
    CONF_SENSORS,
    CONF_SSL,
    DATA_GIGABYTES,
    DATA_MEGABYTES,
    DATA_RATE_MEGABYTES_PER_SECOND,
    Platform,
)
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers import discovery
from homeassistant.helpers.aiohttp_client import async_get_clientsession
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType
from homeassistant.util.json import load_json, save_json

_LOGGER = logging.getLogger(__name__)

DOMAIN = "sabnzbd"
DATA_SABNZBD = "sabznbd"

_CONFIGURING: dict[str, str] = {}

ATTR_SPEED = "speed"
BASE_URL_FORMAT = "{}://{}:{}/"
CONFIG_FILE = "sabnzbd.conf"
DEFAULT_HOST = "localhost"
DEFAULT_NAME = "SABnzbd"
DEFAULT_PORT = 8080
DEFAULT_SPEED_LIMIT = "100"
DEFAULT_SSL = False

UPDATE_INTERVAL = timedelta(seconds=30)

SERVICE_PAUSE = "pause"
SERVICE_RESUME = "resume"
SERVICE_SET_SPEED = "set_speed"

SIGNAL_SABNZBD_UPDATED = "sabnzbd_updated"


@dataclass
class SabnzbdRequiredKeysMixin:
    """Mixin for required keys."""

    field_name: str


@dataclass
class SabnzbdSensorEntityDescription(SensorEntityDescription, SabnzbdRequiredKeysMixin):
    """Describes Sabnzbd sensor entity."""


SENSOR_TYPES: tuple[SabnzbdSensorEntityDescription, ...] = (
    SabnzbdSensorEntityDescription(
        key="current_status",
        name="Status",
        field_name="status",
    ),
    SabnzbdSensorEntityDescription(
        key="speed",
        name="Speed",
        native_unit_of_measurement=DATA_RATE_MEGABYTES_PER_SECOND,
        field_name="kbpersec",
    ),
    SabnzbdSensorEntityDescription(
        key="queue_size",
        name="Queue",
        native_unit_of_measurement=DATA_MEGABYTES,
        field_name="mb",
    ),
    SabnzbdSensorEntityDescription(
        key="queue_remaining",
        name="Left",
        native_unit_of_measurement=DATA_MEGABYTES,
        field_name="mbleft",
    ),
    SabnzbdSensorEntityDescription(
        key="disk_size",
        name="Disk",
        native_unit_of_measurement=DATA_GIGABYTES,
        field_name="diskspacetotal1",
    ),
    SabnzbdSensorEntityDescription(
        key="disk_free",
        name="Disk Free",
        native_unit_of_measurement=DATA_GIGABYTES,
        field_name="diskspace1",
    ),
    SabnzbdSensorEntityDescription(
        key="queue_count",
        name="Queue Count",
        field_name="noofslots_total",
    ),
    SabnzbdSensorEntityDescription(
        key="day_size",
        name="Daily Total",
        native_unit_of_measurement=DATA_GIGABYTES,
        field_name="day_size",
    ),
    SabnzbdSensorEntityDescription(
        key="week_size",
        name="Weekly Total",
        native_unit_of_measurement=DATA_GIGABYTES,
        field_name="week_size",
    ),
    SabnzbdSensorEntityDescription(
        key="month_size",
        name="Monthly Total",
        native_unit_of_measurement=DATA_GIGABYTES,
        field_name="month_size",
    ),
    SabnzbdSensorEntityDescription(
        key="total_size",
        name="Total",
        native_unit_of_measurement=DATA_GIGABYTES,
        field_name="total_size",
    ),
)

SENSOR_KEYS: list[str] = [desc.key for desc in SENSOR_TYPES]

SPEED_LIMIT_SCHEMA = vol.Schema(
    {vol.Optional(ATTR_SPEED, default=DEFAULT_SPEED_LIMIT): cv.string}
)

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Required(CONF_API_KEY): cv.string,
                vol.Optional(CONF_HOST, default=DEFAULT_HOST): cv.string,
                vol.Optional(CONF_PATH): cv.string,
                vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
                vol.Optional(CONF_PORT, default=DEFAULT_PORT): cv.port,
                vol.Optional(CONF_SENSORS): vol.All(
                    cv.ensure_list, [vol.In(SENSOR_KEYS)]
                ),
                vol.Optional(CONF_SSL, default=DEFAULT_SSL): cv.boolean,
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)


async def async_check_sabnzbd(sab_api):
    """Check if we can reach SABnzbd."""

    try:
        await sab_api.check_available()
        return True
    except SabnzbdApiException:
        _LOGGER.error("Connection to SABnzbd API failed")
        return False


async def async_configure_sabnzbd(
    hass, config, use_ssl, name=DEFAULT_NAME, api_key=None
):
    """Try to configure Sabnzbd and request api key if configuration fails."""

    host = config[CONF_HOST]
    port = config[CONF_PORT]
    web_root = config.get(CONF_PATH)
    uri_scheme = "https" if use_ssl else "http"
    base_url = BASE_URL_FORMAT.format(uri_scheme, host, port)
    if api_key is None:
        conf = await hass.async_add_executor_job(
            load_json, hass.config.path(CONFIG_FILE)
        )
        api_key = conf.get(base_url, {}).get(CONF_API_KEY, "")

    sab_api = SabnzbdApi(
        base_url, api_key, web_root=web_root, session=async_get_clientsession(hass)
    )
    if await async_check_sabnzbd(sab_api):
        async_setup_sabnzbd(hass, sab_api, config, name)
    else:
        async_request_configuration(hass, config, base_url, web_root)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the SABnzbd component."""

    async def sabnzbd_discovered(service: str, info: DiscoveryInfoType | None) -> None:
        """Handle service discovery."""
        if not info:
            return
        ssl = info.get("properties", {}).get("https", "0") == "1"
        await async_configure_sabnzbd(hass, info, ssl)

    discovery.async_listen(hass, SERVICE_SABNZBD, sabnzbd_discovered)

    if (conf := config.get(DOMAIN)) is not None:
        use_ssl = conf[CONF_SSL]
        name = conf.get(CONF_NAME)
        api_key = conf.get(CONF_API_KEY)
        await async_configure_sabnzbd(hass, conf, use_ssl, name, api_key)
    return True


@callback
def async_setup_sabnzbd(hass, sab_api, config, name):
    """Set up SABnzbd sensors and services."""
    sab_api_data = SabnzbdApiData(sab_api, name, config.get(CONF_SENSORS, {}))

    if config.get(CONF_SENSORS):
        hass.data[DATA_SABNZBD] = sab_api_data
        hass.async_create_task(
            discovery.async_load_platform(hass, Platform.SENSOR, DOMAIN, {}, config)
        )

    async def async_service_handler(service: ServiceCall) -> None:
        """Handle service calls."""
        if service.service == SERVICE_PAUSE:
            await sab_api_data.async_pause_queue()
        elif service.service == SERVICE_RESUME:
            await sab_api_data.async_resume_queue()
        elif service.service == SERVICE_SET_SPEED:
            speed = service.data.get(ATTR_SPEED)
            await sab_api_data.async_set_queue_speed(speed)

    hass.services.async_register(
        DOMAIN, SERVICE_PAUSE, async_service_handler, schema=vol.Schema({})
    )

    hass.services.async_register(
        DOMAIN, SERVICE_RESUME, async_service_handler, schema=vol.Schema({})
    )

    hass.services.async_register(
        DOMAIN, SERVICE_SET_SPEED, async_service_handler, schema=SPEED_LIMIT_SCHEMA
    )

    async def async_update_sabnzbd(now):
        """Refresh SABnzbd queue data."""

        try:
            await sab_api.refresh_data()
            async_dispatcher_send(hass, SIGNAL_SABNZBD_UPDATED, None)
        except SabnzbdApiException as err:
            _LOGGER.error(err)

    async_track_time_interval(hass, async_update_sabnzbd, UPDATE_INTERVAL)


@callback
def async_request_configuration(hass, config, host, web_root):
    """Request configuration steps from the user."""

    # We got an error if this method is called while we are configuring
    if host in _CONFIGURING:
        configurator.async_notify_errors(
            hass, _CONFIGURING[host], "Failed to register, please try again."
        )

        return

    async def async_configuration_callback(data):
        """Handle configuration changes."""
        api_key = data.get(CONF_API_KEY)
        sab_api = SabnzbdApi(
            host, api_key, web_root=web_root, session=async_get_clientsession(hass)
        )
        if not await async_check_sabnzbd(sab_api):
            return

        def success():
            """Signal successful setup."""
            conf = load_json(hass.config.path(CONFIG_FILE))
            conf[host] = {CONF_API_KEY: api_key}
            save_json(hass.config.path(CONFIG_FILE), conf)
            req_config = _CONFIGURING.pop(host)
            configurator.request_done(hass, req_config)

        hass.async_add_job(success)
        async_setup_sabnzbd(hass, sab_api, config, config.get(CONF_NAME, DEFAULT_NAME))

    _CONFIGURING[host] = configurator.async_request_config(
        hass,
        DEFAULT_NAME,
        async_configuration_callback,
        description="Enter the API Key",
        submit_caption="Confirm",
        fields=[{"id": CONF_API_KEY, "name": "API Key", "type": ""}],
    )


class SabnzbdApiData:
    """Class for storing/refreshing sabnzbd api queue data."""

    def __init__(self, sab_api, name, sensors):
        """Initialize component."""
        self.sab_api = sab_api
        self.name = name
        self.sensors = sensors

    async def async_pause_queue(self):
        """Pause Sabnzbd queue."""

        try:
            return await self.sab_api.pause_queue()
        except SabnzbdApiException as err:
            _LOGGER.error(err)
            return False

    async def async_resume_queue(self):
        """Resume Sabnzbd queue."""

        try:
            return await self.sab_api.resume_queue()
        except SabnzbdApiException as err:
            _LOGGER.error(err)
            return False

    async def async_set_queue_speed(self, limit):
        """Set speed limit for the Sabnzbd queue."""

        try:
            return await self.sab_api.set_speed_limit(limit)
        except SabnzbdApiException as err:
            _LOGGER.error(err)
            return False

    def get_queue_field(self, field):
        """Return the value for the given field from the Sabnzbd queue."""
        return self.sab_api.queue.get(field)
