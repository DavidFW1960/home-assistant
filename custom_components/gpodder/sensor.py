"""Sensor platform for gPodder."""
from custom_components.gpodder.entity import GpodderEntity
from custom_components.gpodder.const import DOMAIN


async def async_setup_entry(hass, entry, async_add_devices):
    """Setup sensor platform."""
    coordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_devices([GpodderSensor(coordinator, entry)])


class GpodderSensor(GpodderEntity):
    """gPodder Sensor class."""

    @property
    def name(self):
        """Return the name of the sensor."""
        return self.coordinator.name

    @property
    def state(self):
        """Return the state of the sensor."""
        return len(self.coordinator.data)

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return {"podcasts": self.coordinator.data}
