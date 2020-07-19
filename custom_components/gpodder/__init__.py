"""
Component to integrate with gPodder.

For more details about this component, please refer to
https://github.com/custom-components/gpodder
"""
import logging
from datetime import timedelta
from urllib.request import Request, urlopen
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
import podcastparser
from homeassistant.exceptions import ConfigEntryNotReady
from mygpoclient import api

from custom_components.gpodder.const import (
    CONF_DEVICE,
    CONF_NAME,
    CONF_PASSWORD,
    CONF_SENSOR,
    CONF_USERNAME,
    DOMAIN,
    REQUEST_HEADERS,
    STARTUP,
)

UPDATE_INTERVAL = timedelta(minutes=30)

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Set up this integration using YAML is not supported."""
    return True


async def async_setup_entry(hass, entry):
    """Set up this integration using UI."""
    if hass.data.get(DOMAIN) is None:
        hass.data.setdefault(DOMAIN, {})
        _LOGGER.info(STARTUP)

    username = entry.data.get(CONF_USERNAME)
    password = entry.data.get(CONF_PASSWORD)
    device = entry.data.get(CONF_DEVICE)
    name = entry.data.get(CONF_NAME)

    coordinator = GpodderDataUpdateCoordinator(hass, username, password, device, name)
    await coordinator.async_refresh()

    if not coordinator.last_update_success:
        raise ConfigEntryNotReady

    hass.data[DOMAIN][entry.entry_id] = coordinator

    hass.async_add_job(
        hass.config_entries.async_forward_entry_setup(entry, CONF_SENSOR)
    )

    entry.add_update_listener(async_reload_entry)
    return True


def parse_entry(entry):
    download_url = entry["enclosures"][0]["url"]
    return {
        "title": entry["title"],
        "description": entry.get("description", ""),
        "url": download_url,
        "mime_type": entry["enclosures"][0]["mime_type"],
        "guid": entry.get("guid", download_url),
        "link": entry.get("link", ""),
        "published": entry.get("published", 0),
        "total_time": entry.get("total_time", 0),
    }


def update_using_feedservice(urls):
    podcasts = []

    for url in urls:
        try:
            feed = podcastparser.parse(
                url, urlopen(Request(url, headers=REQUEST_HEADERS)), 5
            )
        except Exception as error:  # pylint: disable=broad-except
            _LOGGER.error("Could not update %s - %s", url, error)
            feed = None

        if feed is None:
            _LOGGER.info("Feed not updated: %s", url)
            continue

        # Handle permanent redirects
        if feed.get("new_location", False):
            new_url = feed["new_location"]
            _LOGGER.info("Redirect %s => %s", url, new_url)
            url = new_url

        # Error handling
        if feed.get("errors", False):
            _LOGGER.error("Error parsing feed: %s", repr(feed["errors"]))
            continue

        # Update per-podcast metadata
        podcast = {
            "title": feed.get("title", ""),
            "link": feed.get("link", url),
            "description": feed.get("description", ""),
            "cover_url": feed.get("logo", ""),
            "episodes": [parse_entry(entry) for entry in feed["episodes"]],
        }

        podcasts.append(podcast)

    _LOGGER.debug(f"Podcasts: {podcasts}")
    return podcasts


class GpodderDataUpdateCoordinator(DataUpdateCoordinator):
    """Class to manage fetching data from the API."""

    def __init__(self, hass, username, password, device, name):
        """Initialize."""
        self.hass = hass
        self.name = name
        self.api = api.MygPodderClient(username, password)
        self.device = device

        super().__init__(hass, _LOGGER, name=DOMAIN, update_interval=UPDATE_INTERVAL)

    async def _async_update_data(self):
        """Update data."""
        try:
            urls = await self.hass.async_add_executor_job(
                self.api.get_subscriptions, self.device
            )
            _LOGGER.debug(f"{len(urls)} urls for device '{self.device}'")
            return await self.hass.async_add_executor_job(
                update_using_feedservice, urls
            )
        except (Exception, BaseException) as exception:
            raise UpdateFailed(
                f"Could not update data for device '{self.device}' - {exception}"
            )


async def async_unload_entry(hass, entry):
    """Handle removal of an entry."""
    unloaded = await hass.config_entries.async_forward_entry_unload(entry, CONF_SENSOR)
    if unloaded:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unloaded


async def async_reload_entry(hass, entry):
    """Reload config entry."""
    await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)
