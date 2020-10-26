"""Platform for sensor integration."""
import logging
import random

from homeassistant.const import (
    ATTR_ATTRIBUTION,
    DEVICE_CLASS_HUMIDITY,
    DEVICE_CLASS_TEMPERATURE,
    #LENGTH_MILLIMETERS,
    #PERCENTAGE,
    TEMP_CELSIUS,
)
from homeassistant.helpers.entity import Entity
from .const import DOMAIN

from homeassistant.const import ATTR_VOLTAGE

_LOGGER = logging.getLogger(__name__)

OBSERVATIONS = {
    "temp": ["Temperature", TEMP_CELSIUS, DEVICE_CLASS_TEMPERATURE],
    "temp_feels_like": ["Temperature Feels Like", TEMP_CELSIUS, DEVICE_CLASS_TEMPERATURE],
    "rain_since_9am": ["Rain Since 9am", "mm", None],
    "humidity": ["Humidity", "%", DEVICE_CLASS_HUMIDITY],
    "wind_speed_kilometre": ["Wind Speed", "km/h", None],
    "wind_speed_knot": ["Wind Speed Knots", "kts", None],
    "wind_direction": ["Wind Direction", None, None],
    "gust_speed_kilometre": ["Gust Speed", "km/h", None],
    "gust_speed_knot": ["Gust Speed Knots", "kts", None],
}

async def async_setup_entry(hass, config_entry, async_add_devices):
    """Add sensors for passed config_entry in HA."""
    collector = hass.data[DOMAIN][config_entry.entry_id]
    await collector.get_observations_data()
    station_name = collector.observations_data["data"]["station"]["name"]
    new_devices = []
    for observation in collector.observations_data["data"]:
        if observation in OBSERVATIONS:
            new_devices.append(Sensor(collector, station_name, observation))
    if new_devices:
        async_add_devices(new_devices)


class Sensor(Entity):
    """Base representation of a BOM Sensor."""

    def __init__(self, collector, station_name, observation):
        """Initialize the sensor."""
        self.collector = collector
        self.station_name = station_name
        self.observation = observation

    @property
    def unique_id(self):
        """Return Unique ID string."""
        return f"{self.station_name}_{self.observation}"

    @property
    def device_state_attributes(self):
        """Return the state attributes of the sensor."""
        attr = {
            ATTR_ATTRIBUTION: "Data provided by the Australian Bureau of Meteorology",
        }
        return attr

    @property
    def state(self):
        """Return the state of the sensor."""
        return self.collector.observations_data["data"][self.observation]

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement."""
        return OBSERVATIONS[self.observation][1]

    @property
    def name(self):
        """Return the name of the sensor."""
        return f"{self.station_name} {OBSERVATIONS[self.observation][0]}"

    @property
    def device_class(self):
        """Return the name of the sensor."""
        return OBSERVATIONS[self.observation][2]