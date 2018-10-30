"""
Sonarr component for the Upcoming Media Lovelace card.

This is a simple modification of the default sonarr component,
it can work with or without the default sonarr component. 

"""
import logging
import time
import re
import json
from datetime import date, datetime

import requests
import voluptuous as vol

import homeassistant.helpers.config_validation as cv
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.const import (
    CONF_API_KEY, CONF_HOST, CONF_PORT, CONF_MONITORED_CONDITIONS, CONF_SSL)
from homeassistant.helpers.entity import Entity

__version__ = '0.1.2'

_LOGGER = logging.getLogger(__name__)

CONF_DAYS = 'days'
CONF_INCLUDED = 'include_paths'
CONF_URLBASE = 'urlbase'

DEFAULT_HOST = 'localhost'
DEFAULT_PORT = 8989
DEFAULT_URLBASE = ''
DEFAULT_DAYS = '7'

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
})

def setup_platform(hass, config, add_devices, discovery_info=None):
    """Set up the Sonarr platform."""
    conditions = config.get(CONF_MONITORED_CONDITIONS)
    add_devices(
        [Sonarr_UpcomingSensor(hass, config, sensor) for sensor in conditions], True)

class Sonarr_UpcomingSensor(Entity):
    """Implementation of the Sonarr sensor."""

    def __init__(self, hass, conf, sensor_type):
        """Create Sonarr entity."""
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

    @property
    def name(self):
        """Return the name of the sensor."""
        return '{} {}'.format('Sonarr_Upcoming', self._name)

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
        default['line1_default'] = '$episode'
        default['line2_default'] = '$release'
        default['line3_default'] = '$rating - $runtime'
        default['line4_default'] = '$number - $studio'
        default['icon'] = 'mdi:arrow-down-bold'
        data.append(default)
        self.attribNum = 0
        for show in self.data:
            pre = {}
            
            """Get number of days between now and air date."""
            n=list(map(int, self.now.split("-")))
            r=list(map(int, show['airDateUtc'][:-10].split("-")))
            today = date(n[0],n[1],n[2])
            airday = date(r[0],r[1],r[2])
            daysBetween = (airday-today).days

            self.attribNum += 1
            pre['title'] = show.get('series',{}).get('title','')
            pre['episode'] = show['title']
            pre['flag'] = show['hasFile']
            pre['airdate'] = show['airDateUtc']
            pre['number'] = 'S{:02d}E{:02d}'.format(show['seasonNumber'], show['episodeNumber'])
            pre['runtime'] = show['series']['runtime']
            pre['studio'] = show['series']['network']
            try:
                if show['series']['ratings']['value'] > 0:
                    pre['rating'] = "\N{BLACK STAR}"+' '+str(show['series']['ratings']['value'])
                else: pre['rating'] = ''
            except: pre['rating'] = ''
            if daysBetween <= 7: pre['release'] = '$day, $time'
            else: pre['release'] = '$day, $date $time'
            try: pre['poster'] = re.sub('banners/', 'banners/_cache/', show['series']['images'][2]['url'])
            except: pre['poster'] = 'https://i.imgur.com/GmAQyT5.jpg'
            try:
                if '.jpg' not in show['series']['images'][0]['url']: pre['fanart'] = ''
                else: pre['fanart'] = re.sub('banners/', 'banners/_cache/', show['series']['images'][0]['url'])
            except: pre['fanart'] = ''
            
            i=0
            genres = ''
            for x in show['series']['genres']:
                if i > 0: genres += ', '
                genres += show['series']['genres'][i]
                i += 1
                if i == 3: break
            pre['genres'] = genres

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
                        lambda x: x['airDate'] == str(start),
                        res.json()
                    )
                )
            else: self.data = res.json()
            self._state = self.attribNum

def get_date(zone, offset=0):
    """Get date based on timezone and offset of days."""
    day = 60 * 60 * 24
    return datetime.date(
        datetime.fromtimestamp(time.time() + day*offset, tz=zone)
    )
