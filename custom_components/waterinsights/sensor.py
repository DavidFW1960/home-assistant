"""Support for WaterNSW WaterInsights (AU) dam level queries."""

# TODO: Add configuration via UI

import logging
from decimal import Decimal
from datetime import timedelta
from typing import Any, Dict

import voluptuous as vol

from homeassistant.components.sensor import SensorEntity
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.const import (
    CONF_API_KEY,
    CONF_NAME,
    PERCENTAGE,
)
from homeassistant.helpers.typing import (
    ConfigType,
    DiscoveryInfoType,
    HomeAssistantType,
)
from homeassistant.helpers.entity_platform import AddEntitiesCallback
import homeassistant.helpers.config_validation as cv

from .waterinsights import WaterInsightsClient

log = logging.getLogger(__name__)

CONF_DAMS = "dams"
CONF_DAM_ID = "dam_id"
CONF_API_SECRET = "api_secret"
DAM_SCHEMA = vol.Schema(
    {vol.Required(CONF_DAM_ID): cv.string, vol.Optional(CONF_NAME): cv.string}
)
PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Required(CONF_API_KEY): cv.string,
        vol.Required(CONF_API_SECRET): cv.string,
        vol.Required(CONF_DAMS): vol.All(cv.ensure_list, [DAM_SCHEMA]),
    }
)

ATTR_NAME = "name"
ATTR_DAM_ID = "dam_id"
ATTR_STORAGE_VOLUME = "storage_volume"
ATTR_STORAGE_INFLOW = "storage_inflow"
ATTR_STORAGE_RELEASE = "storage_release"

SCAN_INTERVAL = timedelta(hours=12)


def setup_platform(
    hass: HomeAssistantType,
    config: ConfigType,
    add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up the sensor platform."""
    client = WaterInsightsClient(config[CONF_API_KEY], config[CONF_API_SECRET])

    sensors = [
        DamLevelSensor(client, dam[CONF_DAM_ID], dam.get(CONF_NAME))
        for dam in config[CONF_DAMS]
    ]
    add_entities(sensors, True)


class DamLevelSensor(SensorEntity):
    """Implementation of a WaterNSW WaterInsights sensor."""

    def __init__(
        self, client: WaterInsightsClient, dam_id: str, damn_name: str
    ) -> None:
        super().__init__()
        self.dam_id = dam_id
        self.attrs: Dict[str, Any] = {
            ATTR_DAM_ID: self.dam_id,
        }
        self._client = client
        self._configured_name = damn_name
        self._remote_name = None
        self._state = None
        self._available = True
        self._has_entity_name = True
        self._native_unit_of_measurement = PERCENTAGE

    @property
    def name(self) -> str:
        """Return the name of the entity."""
        return self._configured_name or self._remote_name or self.dam_id

    @property
    def unique_id(self) -> str:
        """Return the unique ID of the sensor."""
        return self.dam_id

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return self._available

    @property
    def native_value(self) -> str | None:
        """Return the state of the sensor."""
        return self._state

    @property
    def native_unit_of_measurement(self) -> str | None:
        """Return the state of the sensor."""
        return self._native_unit_of_measurement

    @property
    def extra_state_attributes(self) -> Dict[str, Any]:
        return self.attrs

    @property
    def has_entity_name(self) -> bool:
        """Return True if the entity's name property represents the entity itself."""
        return self._has_entity_name

    def update(self) -> None:
        """Get the latest data from WaterNSW and update state."""
        try:
            dam = self._client.get_latest_dam_resources(self.dam_id)

            # accessible volume as a percentage of maximum accessible volume
            self._state = Decimal(str(dam["resources"][0]["percentage_full"]))
            self._remote_name = dam.get("dam_name")
            self.attrs[ATTR_NAME] = dam.get("dam_name")
            # accessible volume in megalitres
            self.attrs[ATTR_STORAGE_VOLUME] = dam.get("resources")[0].get(
                "storage_volume"
            )
            # volume flowing into the dam in megalitres
            self.attrs[ATTR_STORAGE_INFLOW] = dam.get("resources")[0].get(
                "storage_inflow"
            )
            # volume released from the dam in megalitres
            self.attrs[ATTR_STORAGE_RELEASE] = dam.get("resources")[0].get(
                "storage_release"
            )
        except Exception as exception:
            log.error("Error updating WaterInsights sensor")
            log.error(exception)
