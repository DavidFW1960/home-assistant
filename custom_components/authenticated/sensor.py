"""
A platform which allows you to get information
about successfull logins to Home Assistant.
For more details about this component, please refer to the documentation at
https://github.com/custom-components/sensor.authenticated
"""
import logging
import os
import socket
from datetime import timedelta
import requests
import voluptuous as vol
import yaml
import homeassistant.helpers.config_validation as cv
from homeassistant.components.sensor import PLATFORM_SCHEMA
from homeassistant.helpers.entity import Entity

__version__ = '0.4.2'

_LOGGER = logging.getLogger(__name__)

CONF_NOTIFY = 'enable_notification'
CONF_EXCLUDE = 'exclude'
CONF_PROVIDER = 'provider'
CONF_LOG_LOCATION = 'log_location'

ATTR_HOSTNAME = 'hostname'
ATTR_COUNTRY = 'country'
ATTR_REGION = 'region'
ATTR_CITY = 'city'
ATTR_NEW_IP = 'new_ip'
ATTR_LAST_AUTHENTICATE_TIME = 'last_authenticated_time'
ATTR_PREVIOUS_AUTHENTICATE_TIME = 'previous_authenticated_time'

SCAN_INTERVAL = timedelta(minutes=1)

PLATFORM_NAME = 'authenticated'

LOGFILE = 'home-assistant.log'
OUTFILE = '.ip_authenticated.yaml'

PROVIDERS = ['ipapi', 'extreme', 'ipvigilante']

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_PROVIDER, default='ipapi'): vol.In(PROVIDERS),
    vol.Optional(CONF_LOG_LOCATION, default=''): cv.string,
    vol.Optional(CONF_NOTIFY, default=True): cv.boolean,
    vol.Optional(CONF_EXCLUDE, default='None'):
        vol.All(cv.ensure_list, [cv.string]),
    })


def setup_platform(hass, config, add_devices, discovery_info=None):
    """Create the sensor"""
    notify = config.get(CONF_NOTIFY)
    exclude = config.get(CONF_EXCLUDE)
    logs = {'homeassistant.components.http.view': 'debug'}
    _LOGGER.debug('Making sure the logger is correctly setup.')
    hass.services.call('logger', 'set_level', logs)
    if config[CONF_LOG_LOCATION] is None:
        log = str(hass.config.path(LOGFILE))
    else:
        log = config[CONF_LOG_LOCATION]
    log = str(hass.config.path(LOGFILE))
    out = str(hass.config.path(OUTFILE))
    add_devices([Authenticated(hass, notify, log, out, exclude,
                               config[CONF_PROVIDER])])


class Authenticated(Entity):
    """Representation of a Sensor."""

    def __init__(self, hass, notify, log, out, exclude, provider):
        """Initialize the sensor."""
        hass.data[PLATFORM_NAME] = {}
        self._state = None
        self._hostname = None
        self._country = None
        self._region = None
        self._city = None
        self._provider = provider
        self._new_ip = False
        self._LAT = None
        self._PAT = None
        self._exclude = exclude
        self._notify = notify
        self._log = log
        self._out = out
        self._data = hass.data[PLATFORM_NAME]
        self.initial_run()
        self.update()

    def initial_run(self):
        """Run this at startup to initialize the platform data."""
        if os.path.isfile(self._out):
            file_content = get_outfile_content(self._out)
            for ip_address in file_content:
                accesstime = file_content[ip_address]['last_authenticated']
                self._data[ip_address] = {'accesstime': accesstime}
        else:
            _LOGGER.debug('File has not been created, no data pressent.')

    def update(self):
        """Method to update sensor value"""
        log_content = get_log_content(self._log, self._exclude)
        count = len(log_content)
        if count != 0:
            last_ip = list(log_content)[-1]
            for ip_address in log_content:
                self.process_ip(ip_address, log_content[ip_address]['access'])
            known_ips = get_outfile_content(self._out)
            self._state = last_ip
            self._hostname = known_ips[last_ip]['hostname']
            self._country = known_ips[last_ip]['country']
            self._region = known_ips[last_ip]['region']
            self._city = known_ips[last_ip]['city']
            self._LAT = known_ips[last_ip]['last_authenticated']
            self._PAT = known_ips[last_ip]['previous_authenticated_time']

    def process_ip(self, ip_address, accesstime):
        """Process the IP found in the log"""
        if not os.path.isfile(self._out):
            # First IP
            self.add_new_ip(ip_address, accesstime)
            self._new_ip = True
        elif ip_address not in self._data:
            # New ip_address
            self.add_new_ip(ip_address, accesstime)
            self._new_ip = True
        elif self._data[ip_address]['accesstime'] != accesstime:
            # Update timestamp
            update_ip(self._out, ip_address, accesstime)
            self._new_ip = False
            self._data[ip_address] = {'accesstime': accesstime}
        self._data[ip_address] = {'accesstime': accesstime}

    def add_new_ip(self, ip_address, access_time):
        """Add new IP to the file"""
        _LOGGER.info('Found new IP %s', ip_address)
        hostname = get_hostname(ip_address)
        geo = get_geo_data(ip_address, self._provider)
        if geo['result']:
            country = geo['data']['country_name']
            region = geo['data']['region']
            city = geo['data']['city']
        else:
            country = 'none'
            region = 'none'
            city = 'none'
        write_to_file(self._out, ip_address, access_time,
                      access_time, hostname, country, region, city)
        self._new_ip = 'true'
        if self._notify:
            notify = self.hass.components.persistent_notification.create
            notify('{}'.format(ip_address + ' (' +
                               str(country) + ', ' +
                               str(region) + ', ' +
                               str(city) + ')'), 'New successful login from')
        else:
            _LOGGER.debug('persistent_notifications is disabled in config')

    @property
    def name(self):
        """Return the name of the sensor."""
        return 'Last successful authentication'

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def icon(self):
        """Return the icon of the sensor."""
        return 'mdi:security-lock'

    @property
    def device_state_attributes(self):
        """Return attributes for the sensor."""
        return {
            ATTR_HOSTNAME: self._hostname,
            ATTR_COUNTRY: self._country,
            ATTR_REGION: self._region,
            ATTR_CITY: self._city,
            ATTR_NEW_IP: self._new_ip,
            ATTR_LAST_AUTHENTICATE_TIME: self._LAT,
            ATTR_PREVIOUS_AUTHENTICATE_TIME: self._PAT,
        }


def get_outfile_content(file):
    """Get the content of the outfile"""
    with open(file) as out_file:
        content = yaml.load(out_file)
    out_file.close()
    return content


def get_log_content(file, exclude):
    """Get the content of the logfile"""
    _LOGGER.debug('Searching log file for IP addresses.')
    content = {}
    with open(file) as log_file:
        for line in log_file.readlines():
            if '(auth: True)' in line or 'Serving /auth/token' in line:
                ip_address = line.split(' ')[8]
                if ip_address not in exclude:
                    access = line.split(' ')[0] + ' ' + line.split(' ')[1]
                    content[ip_address] = {"access": access}
    log_file.close()
    return content


def get_geo_data(ip_address, provider):
    """Get geo data for an IP"""
    result = {"result": False, "data": "none"}
    if provider == 'ipapi':
        api = 'https://ipapi.co/' + ip_address + '/json'
        try:
            data = requests.get(api, timeout=5).json()
            if 'reserved' in str(data):
                result = {"result": False, "data": "none"}
            else:
                result = {"result": True, "data": {
                    'country_name': data['country_name'],
                    'region': data['region'],
                    'city': data['city']
                }}
        except Exception:
            result = {"result": False, "data": "none"}
    elif provider == 'extreme':
        api = 'https://extreme-ip-lookup.com/json/' + ip_address
        try:
            data = requests.get(api, timeout=5).json()
            if 'Private' in data['org']:
                result = {"result": False, "data": "none"}
            else:
                result = {"result": True, "data": {
                    'country_name': data['country'],
                    'region': data['region'],
                    'city': data['city']
                }}
        except Exception:
            result = {"result": False, "data": "none"}
    elif provider == 'ipvigilante':
        api = 'https://ipvigilante.com/json/' + ip_address
        try:
            data = requests.get(api, timeout=5).json()
            if data['status'] != 'success':
                result = {"result": False, "data": "none"}
            else:
                result = {"result": True, "data": {
                    'country_name': data['data']['country_name'],
                    'region': data['data']['subdivision_1_name'],
                    'city': data['data']['city_name']
                }}
        except Exception:
            result = {"result": False, "data": "none"}
    return result


def get_hostname(ip_address):
    """Return hostname for an IP"""
    return socket.getfqdn(ip_address)


def update_ip(file, ip_address, access_time):
    """Update the timestamp for an IP"""
    hostname = get_hostname(ip_address)
    _LOGGER.debug('Found known IP %s, updating timestamps.', ip_address)
    info = get_outfile_content(file)

    last = info[ip_address]['last_authenticated']
    info[ip_address]['previous_authenticated_time'] = last
    info[ip_address]['last_authenticated'] = access_time
    info[ip_address]['hostname'] = hostname

    with open(file, 'w') as out_file:
        yaml.dump(info, out_file, default_flow_style=False)
    out_file.close()


def write_to_file(file, ip_address, last_authenticated,
                  previous_authenticated_time,
                  hostname, country, region, city):
    """Writes info to out control file"""
    with open(file, 'a') as out_file:
        out_file.write(ip_address + ':')
    out_file.close()

    info = get_outfile_content(file)

    info[ip_address] = dict(
        hostname=hostname,
        last_authenticated=last_authenticated,
        previous_authenticated_time=previous_authenticated_time,
        country=country,
        region=region,
        city=city
    )
    with open(file, 'w') as out_file:
        yaml.dump(info, out_file, default_flow_style=False)
    out_file.close()
