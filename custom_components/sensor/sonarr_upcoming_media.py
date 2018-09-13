"""
Sonarr component for the Upcoming Media Lovelace card.

This is a simple modification of the default sonarr component,
it can work with or without the default sonarr component. 

"""
import logging
import time
import re
from datetime import datetime

import requests
import voluptuous as vol

import homeassistant.helpers.config_validation as cv
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.const import (
    CONF_API_KEY, CONF_HOST, CONF_PORT, CONF_MONITORED_CONDITIONS, CONF_SSL)
from homeassistant.helpers.entity import Entity

__version__ = '0.0.7'

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
        attributes = {}
        attribNum = 0
        for show in self.data:
            attribNum += 1
            try: attributes['banner' + str(attribNum)] = show['series']['images'][1]['url']
            except: attributes['banner' + str(attribNum)] = 'https://i.imgur.com/fxX01Ic.jpg'
            try: attributes['poster' + str(attribNum)] = re.sub('banners/', 'banners/_cache/', show['series']['images'][2]['url'])
            except: attributes['poster' + str(attribNum)] = 'https://i.imgur.com/GmAQyT5.jpg'
            try:
                if '.jpg' not in show['series']['images'][0]['url']:
                    attributes['fanart' + str(attribNum)] = re.sub('banners/', 'banners/_cache/', show['series']['images'][2]['url'])
                else: attributes['fanart' + str(attribNum)] = re.sub('banners/', 'banners/_cache/', show['series']['images'][0]['url'])
            except: attributes['fanart' + str(attribNum)] = ''
            try: studio = show['series']['network']
            except: studio = ''
            try:
                if show['series']['ratings']['value'] > 0:
                    rating = "\N{BLACK STAR}"+' '+str(show['series']['ratings']['value'])
                else: rating = ''
            except: rating = ''
            if all((studio,rating)): attributes['extrainfo' + str(attribNum)] = rating+' - '+studio
            elif studio and not rating: attributes['extrainfo' + str(attribNum)] = studio
            elif rating and not studio: attributes['extrainfo' + str(attribNum)] = rating
            else: attributes['extrainfo' + str(attribNum)] = ''
            attributes['title' + str(attribNum)] = show['series']['title']
            attributes['subtitle' + str(attribNum)] = show['title']
            attributes['airdate' + str(attribNum)] = show['airDateUtc']
            attributes['airtime' + str(attribNum)] = show['series']['airTime']
            attributes['hasFile' + str(attribNum)] = show['hasFile']
            attributes['info' + str(attribNum)] = 'S{:02d}E{:02d}'.format(show['seasonNumber'], show['episodeNumber'])
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
            self._state = len(self.data)

def get_date(zone, offset=0):
    """Get date based on timezone and offset of days."""
    day = 60 * 60 * 24
    return datetime.date(
        datetime.fromtimestamp(time.time() + day*offset, tz=zone)
    )
