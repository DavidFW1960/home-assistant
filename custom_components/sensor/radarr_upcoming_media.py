"""
Radarr component for the Upcoming Media Lovelace card.

This is a simple modification of the default sonarr component,
it can work with or without the default radarr component.

"""
import logging
import time
import json
from datetime import date, datetime

import requests
import voluptuous as vol

import homeassistant.helpers.config_validation as cv
from collections import defaultdict
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.const import (
    CONF_API_KEY, CONF_HOST, CONF_PORT, CONF_MONITORED_CONDITIONS, CONF_SSL)
from homeassistant.helpers.entity import Entity

__version__ = '0.2.1'

_LOGGER = logging.getLogger(__name__)

CONF_DAYS = 'days'
CONF_INCLUDED = 'include_paths'
CONF_URLBASE = 'urlbase'
CONF_THEATERS = 'theaters'

DEFAULT_HOST = 'localhost'
DEFAULT_PORT = 7878
DEFAULT_URLBASE = ''
DEFAULT_DAYS = '60'

SENSOR_TYPES = {
    'media': ['media', None, None]
}

ENDPOINTS = {
    'media':
        'http{0}://{1}:{2}/{3}api/calendar?start={4}&end={5}'
}

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_API_KEY): cv.string,
    vol.Optional(CONF_DAYS, default=DEFAULT_DAYS): cv.string,
    vol.Optional(CONF_HOST, default=DEFAULT_HOST): cv.string,
    vol.Optional(CONF_INCLUDED, default=[]): cv.ensure_list,
    vol.Optional(CONF_MONITORED_CONDITIONS, default=['media']):
        vol.All(cv.ensure_list, [vol.In(list(SENSOR_TYPES))]),
    vol.Optional(CONF_PORT, default=DEFAULT_PORT): cv.port,
    vol.Optional(CONF_SSL, default=False): cv.boolean,
    vol.Optional(CONF_URLBASE, default=DEFAULT_URLBASE): cv.string,
    vol.Optional(CONF_THEATERS, default=True): cv.boolean,
})

def setup_platform(hass, config, add_devices, discovery_info=None):
    """Set up the Radarr platform."""
    conditions = config.get(CONF_MONITORED_CONDITIONS)
    add_devices(
        [Radarr_UpcomingSensor(hass, config, sensor) for sensor in conditions], True)
class Radarr_UpcomingSensor(Entity):
    """Implementation of the Radarr sensor."""

    def __init__(self, hass, conf, sensor_type):
        """Create Radarr entity."""
        from pytz import timezone
        self.conf = conf
        self.host = conf.get(CONF_HOST)
        self.port = conf.get(CONF_PORT)
        self.urlbase = conf.get(CONF_URLBASE)
        if self.urlbase:
            self.urlbase = "{}/".format(self.urlbase.strip('/'))
        self.apikey = conf.get(CONF_API_KEY)
        self.included = conf.get(CONF_INCLUDED)
        self.days = int(conf.get(CONF_DAYS))
        self.ssl = 's' if conf.get(CONF_SSL) else ''
        self._state = None
        self.data = []
        self._tz = timezone(str(hass.config.time_zone))
        self.type = sensor_type
        self._name = SENSOR_TYPES[self.type][0]
        self.attribNum = 0
        self.now = str(get_date(self._tz))
        self.theaters = conf.get(CONF_THEATERS)

    @property
    def name(self):
        """Return the name of the sensor."""
        return '{} {}'.format('Radarr Upcoming', self._name)

    @property
    def state(self):
        """Return sensor state."""
        return self._state

    @property
    def device_state_attributes(self):
        """Return the state attributes of the sensor."""
        data = []
        attributes = {}
        default = {}
        default['title_default'] = '$title'
        default['line1_default'] = '$release'
        default['line2_default'] = '$genres'
        default['line3_default'] = '$rating - $runtime'
        default['line4_default'] = '$studio'
        default['icon'] = 'mdi:arrow-down-bold'
        data.append(default)
        self.attribNum = 0
        for movie in sorted(self.data, key = lambda i: i['path']):
            pre = {}
            if "/" not in movie['path']:
                """Get days between now and release"""
                n=list(map(int, self.now.split("-")))
                r=list(map(int, movie['path'][:-10].split("-")))
                today = date(n[0],n[1],n[2])
                airday = date(r[0],r[1],r[2])
                daysBetween = (airday-today).days
            else: continue

            if movie['inCinemas'] >= datetime.utcnow().isoformat()[:19]+'Z':
                if not self.theaters: continue
                self.attribNum += 1
                pre['airdate'] = movie['inCinemas']
                if daysBetween <= 7: pre['release'] = 'In Theaters $day'
                else: pre['release'] = 'In Theaters $day, $date'
            elif 'physicalRelease' in movie:
                self.attribNum += 1
                pre['airdate'] = movie['physicalRelease']
                if daysBetween <= 7: pre['release'] = 'Available $day'
                else: pre['release'] = 'Available $day, $date'
            else: continue
            pre['title'] = movie.get('title','')
            pre['flag'] = movie.get('hasFile','')
            pre['runtime'] = movie.get('runtime','')
            pre['genres'] = movie.get('genres','')
            pre['studio'] = movie.get('studio','')
            try:
                if movie['ratings']['value'] > 0:
                    pre['rating'] = "\N{BLACK STAR}"+' '+str(movie['ratings']['value'])
                else: pre['rating'] = ''
            except: pre['rating'] = ''
            try: pre['poster'] = movie['images'][0]
            except: pre['poster'] = 'https://i.imgur.com/GmAQyT5.jpg'
            try:
                if '.jpg' not in movie['images'][1]: pre['fanart'] = ''
                else: pre['fanart'] = movie['images'][1]
            except: pre['fanart'] = ''

            data.append(pre)
        attributes['data'] = json.dumps(data)
        return attributes

    def update(self):
        """Update the data for the sensor."""
        start = get_date(self._tz)
        end = get_date(self._tz, self.days)
        try:
            res = requests.get(
                ENDPOINTS[self.type].format(
                    self.ssl, self.host, self.port,
                    self.urlbase, start, end),
                headers={'X-Api-Key': self.apikey},
                timeout=10)
        except OSError:
            _LOGGER.warning("Host %s is not available", self.host)
            self._state = None
            return

        if res.status_code == 200:
            if self.days == 1:
                self.data = list(
                    filter(
                        lambda x: x['physicalRelease'][:-10] == str(start),
                        res.json()
                    )
                )
            else:
                self.data = res.json()
            self._state = self.attribNum

            """Radarr's API isn't great, so we use tmdb to suppliment"""
            for movie in self.data:
                session = requests.Session()
                # The Movie Database offers free API keys.
                # Limit is 40 calls every 10 seconds per IP not API key.
                tmdburl = session.get('http://api.themoviedb.org/3/movie/{}?api_key=1f7708bb9a218ab891a5d438b1b63992'.format(str(movie['tmdbId'])))
                tmdbjson = tmdburl.json()
                try: movie['images'][0] = 'https://image.tmdb.org/t/p/w500{}'.format(tmdbjson['poster_path'])
                except: movie['images'][0] = 'https://i.imgur.com/GmAQyT5.jpg'
                try: movie['images'][1] = 'https://image.tmdb.org/t/p/w780{}'.format(tmdbjson['backdrop_path'])
                except: movie['images'][1] = ''
                if movie['inCinemas'] >= datetime.utcnow().isoformat()[:19]+'Z': movie['path'] = movie['inCinemas']
                elif 'physicalRelease' in movie: movie['path'] = movie['physicalRelease']
                else: continue

                i=0
                genres = ''
                for x in tmdbjson['genres']:
                    if i > 0: genres += ', '
                    genres += tmdbjson['genres'][i]['name'];
                    i += 1
                    if i == 4: break
                movie['genres'] = genres
                

def get_date(zone, offset=0):
    """Get date based on timezone and offset of days."""
    day = 60 * 60 * 24
    return datetime.date(
        datetime.fromtimestamp(time.time() + day*offset, tz=zone)
    )
