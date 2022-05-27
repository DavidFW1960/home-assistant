"""BOM data 'collector' that downloads the observation data."""
import aiohttp
import asyncio
import datetime
import logging

from homeassistant.util import Throttle

from .const import (
    MAP_MDI_ICON, MAP_UV, URL_BASE, URL_DAILY,
    URL_HOURLY, URL_OBSERVATIONS, URL_WARNINGS
)
from .helpers import (
    flatten_dict, geohash_encode,
)

_LOGGER = logging.getLogger(__name__)

class Collector:
    """Collector for PyBoM."""

    def __init__(self, latitude, longitude):
        """Init collector."""
        self.locations_data = None
        self.observations_data = None
        self.daily_forecasts_data = None
        self.hourly_forecasts_data = None
        self.warnings_data = None
        self.geohash = geohash_encode(latitude, longitude)
        _LOGGER.debug(f"Geohash: {self.geohash}")

    #async def get_location_name(self):
    #    """Get JSON location name from BOM API endpoint."""
    #    async with aiohttp.ClientSession() as session:
    #        response = await session.get(URL_BASE + self.geohash)
    #
    #    if response is not None and response.status == 200:
    #        locations_data = await response.json()
    #        self.location_name = locations_data["data"]["name"]
    #        return True

    async def format_daily_forecast_data(self):
        """Format forecast data."""
        days = len(self.daily_forecasts_data["data"])
        for day in range(0, days):

            d = self.daily_forecasts_data["data"][day]

            d["mdi_icon"] = MAP_MDI_ICON[d["icon_descriptor"]]

            flatten_dict(["amount"], d["rain"])
            flatten_dict(["rain", "uv", "astronomical"], d)

            if day == 0:
                flatten_dict(["now"], d)

            # If rain amount max is None, set as rain amount min
            if d["rain_amount_max"] is None:
                d["rain_amount_max"] = d["rain_amount_min"]
                d["rain_amount_range"] = d["rain_amount_min"]
            else:
                d["rain_amount_range"] = f"{d['rain_amount_min']} to {d['rain_amount_max']}"

    async def format_hourly_forecast_data(self):
        """Format forecast data."""
        hours = len(self.hourly_forecasts_data["data"])
        for hour in range(0, hours):

            d = self.hourly_forecasts_data["data"][hour]

            d["mdi_icon"] = MAP_MDI_ICON[d["icon_descriptor"]]

            flatten_dict(["amount"], d["rain"])
            flatten_dict(["rain", "wind"], d)

            # If rain amount max is None, set as rain amount min
            if d["rain_amount_max"] is None:
                d["rain_amount_max"] = d["rain_amount_min"]
                d["rain_amount_range"] = d["rain_amount_min"]
            else:
                d["rain_amount_range"] = f"{d['rain_amount_min']} to {d['rain_amount_max']}"

    @Throttle(datetime.timedelta(minutes=10))
    async def async_update(self):
        """Refresh the data on the collector object."""
        async with aiohttp.ClientSession() as session:

            if self.locations_data is None:
                async with session.get(URL_BASE + self.geohash) as resp:
                    self.locations_data = await resp.json()
                    _LOGGER.debug(f"Locations data: {self.locations_data}")

            async with session.get(URL_BASE + self.geohash + URL_OBSERVATIONS) as resp:
                self.observations_data = await resp.json()
                if self.observations_data["data"]["wind"] is not None:
                    flatten_dict(["wind"], self.observations_data["data"])
                else:
                    self.observations_data["data"]["wind_direction"] = "unavailable"
                    self.observations_data["data"]["wind_speed_kilometre"] = "unavailable"
                    self.observations_data["data"]["wind_speed_knot"] = "unavailable"
                if self.observations_data["data"]["gust"] is not None:
                    flatten_dict(["gust"], self.observations_data["data"])
                else:
                    self.observations_data["data"]["gust_speed_kilometre"] = "unavailable"
                    self.observations_data["data"]["gust_speed_knot"] = "unavailable"
                _LOGGER.debug(f"Observations data: {self.observations_data}")

            async with session.get(URL_BASE + self.geohash + URL_DAILY) as resp:
                self.daily_forecasts_data = await resp.json()
                await self.format_daily_forecast_data()
                _LOGGER.debug(f"Forecasts data: {self.daily_forecasts_data}")

            async with session.get(URL_BASE + self.geohash + URL_HOURLY) as resp:
                self.hourly_forecasts_data = await resp.json()
                await self.format_hourly_forecast_data()
                _LOGGER.debug(f"Hourly Forecasts data: {self.hourly_forecasts_data}")

            async with session.get(URL_BASE + self.geohash + URL_WARNINGS) as resp:
                self.warnings_data = await resp.json()
                _LOGGER.debug(f"Warnings data: {self.warnings_data}")
