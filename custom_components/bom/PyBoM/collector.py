"""BOM data 'collector' that downloads the observation data."""
import asyncio
import datetime
import aiohttp
import logging

from homeassistant.util import Throttle

_LOGGER = logging.getLogger(__name__)

MIN_TIME_BETWEEN_UPDATES = datetime.timedelta(minutes=10)
OBSERVATIONS_URL = "https://api.weather.bom.gov.au/v1/locations/{}/observations"


class Collector:
    """Data collector for BOM integration."""

    manufacturer = "Demonstration Corp"

    def __init__(self, latitude, longitude):
        """Init BOM data collector."""
        self.observations_data = None
        self.geohash = self.geohash_encode(latitude, longitude)

    @property
    def hub_id(self):
        """ID for dummy hub."""
        return self._id

    async def get_observations_data(self):
        """Get JSON observations data from BOM API endpoint."""
        url = OBSERVATIONS_URL.format(self.geohash)

        async with aiohttp.ClientSession() as session:
            response = await session.get(url)

        if response is not None and response.status == 200:
            self.observations_data = await response.json()
            await self.flatten_data()
            return True

    async def flatten_data(self):
        """Flatten out wind and gust data."""
        flattened = {}
        for observation in self.observations_data["data"]:
            if observation == "wind" or observation == "gust":
                for sub_observation in self.observations_data["data"][observation]:
                    flattened["{}_{}".format(observation, sub_observation)] = self.observations_data["data"][observation][sub_observation]
        self.observations_data["data"].update(flattened)

    def geohash_encode(self, latitude, longitude, precision=6):
        base32 = '0123456789bcdefghjkmnpqrstuvwxyz'
        lat_interval = (-90.0, 90.0)
        lon_interval = (-180.0, 180.0)
        geohash = []
        bits = [16, 8, 4, 2, 1]
        bit = 0
        ch = 0
        even = True
        while len(geohash) < precision:
            if even:
                mid = (lon_interval[0] + lon_interval[1]) / 2
                if longitude > mid:
                    ch |= bits[bit]
                    lon_interval = (mid, lon_interval[1])
                else:
                    lon_interval = (lon_interval[0], mid)
            else:
                mid = (lat_interval[0] + lat_interval[1]) / 2
                if latitude > mid:
                    ch |= bits[bit]
                    lat_interval = (mid, lat_interval[1])
                else:
                    lat_interval = (lat_interval[0], mid)
            even = not even
            if bit < 4:
                bit += 1
            else:
                geohash += base32[ch]
                bit = 0
                ch = 0
        return ''.join(geohash)
