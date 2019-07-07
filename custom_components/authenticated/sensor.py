"""
A platform which allows you to get information
about successfull logins to Home Assistant.
For more details about this component, please refer to the documentation at
https://github.com/custom-components/authenticated
"""
import json
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
ATTR_USER = "username"

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
    hass.data[PLATFORM_NAME] = {}

    if not load_authentications(hass.config.path(".storage/auth")):
        return False

    out = str(hass.config.path(OUTFILE))

    sensor = Authenticated(hass, notify, out, exclude, config[CONF_PROVIDER])
    sensor.initial_run()

    add_devices([sensor], True)


class Authenticated(Entity):
    """Representation of a Sensor."""

    def __init__(self, hass, notify, out, exclude, provider):
        """Initialize the sensor."""
        self.hass = hass
        self._state = None
        self.provider = provider
        self.stored = {}
        self.last_ip = None
        self.exclude = exclude
        self.notify = notify
        self.out = out

    def initial_run(self):
        """Run this at startup to initialize the platform data."""
        users, tokens = load_authentications(self.hass.config.path(".storage/auth"))

        if os.path.isfile(self.out):
            self.stored = get_outfile_content(self.out)
        else:
            _LOGGER.debug('File has not been created, no data pressent.')

        for access in tokens:
            if access["last_used_ip"] in self.exclude:
                continue

            if access["last_used_ip"] in self.stored:
                store = self.stored[access["last_used_ip"]]
                access_data = {}
                access_data["last_used_ip"] = access["last_used_ip"]
                access_data["user_id"] = store.get("user_id")

                if store.get("last_used_at") is not None:
                    access_data["last_used_at"] = store["last_used_at"]
                elif store.get("last_authenticated") is not None:
                    access_data["last_used_at"] = store["last_authenticated"]
                else:
                    access_data["last_used_at"] = None

                if store.get("prev_used_at") is not None:
                    access_data["prev_used_at"] = store["prev_used_at"]
                elif store.get("previous_authenticated_time") is not None:
                    access_data["prev_used_at"] = store["previous_authenticated_time"]
                else:
                    access_data["prev_used_at"] = None
                new = False

            else:
                access_data = {
                    "last_used_ip": access["last_used_ip"],
                    "user_id": access["user_id"],
                    "last_used_at": access["last_used_at"],
                    "prev_used_at": None
                }
                new = True
            self.hass.data[PLATFORM_NAME][access["last_used_ip"]] = IPAddress(access_data, users, self.provider, new)

    def update(self):
        """Method to update sensor value"""
        updated = False
        users, tokens = load_authentications(self.hass.config.path(".storage/auth"))
        for access in tokens:
            if access["last_used_ip"] is None:
                continue
            if access["last_used_ip"] in self.hass.data[PLATFORM_NAME]:
                ipaddress = self.hass.data[PLATFORM_NAME][access["last_used_ip"]]
                if access["last_used_at"] == ipaddress.last_used_at:
                    continue
                elif access["last_used_at"] > ipaddress.last_used_at:
                    updated = True
                    _LOGGER.info("New login from %s", access["last_used_ip"])
                    ipaddress.prev_used_at = ipaddress.last_used_at
                    ipaddress.new_ip = False
                    ipaddress.last_used_at = access["last_used_at"]
                    ipaddress.lookup()
            else:
                updated = True
                _LOGGER.info('Found new IP %s', access["last_used_ip"])
                ipaddress = IPAddress(access, users, self.provider)
                ipaddress.lookup()
                if self.notify:
                    if ipaddress.new_ip:
                        ipaddress.notify(self.hass)

        self.last_ip = self.hass.data[PLATFORM_NAME][tokens[0]["last_used_ip"]]
        self._state = self.last_ip.ip_address
        if updated:
            self.write_to_file()

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
        return 'mdi:lock-alert'

    @property
    def device_state_attributes(self):
        """Return attributes for the sensor."""
        if self.last_ip is None:
            return None
        return {
            ATTR_HOSTNAME: self.last_ip.hostname,
            ATTR_COUNTRY: self.last_ip.country,
            ATTR_REGION: self.last_ip.region,
            ATTR_CITY: self.last_ip.city,
            ATTR_USER: self.last_ip.username,
            ATTR_NEW_IP:self.last_ip.new_ip,
            ATTR_LAST_AUTHENTICATE_TIME: self.last_ip.last_used_at,
            ATTR_PREVIOUS_AUTHENTICATE_TIME: self.last_ip.prev_used_at,
        }

    def write_to_file(self):
        """Write data to file."""
        if os.path.exists(self.out):
            info = get_outfile_content(self.out)
        else:
            info = {}

        for known in self.hass.data[PLATFORM_NAME]:
            known = self.hass.data[PLATFORM_NAME][known]
            info[known.ip_address] = {
                "user_id": known.user_id,
                "last_used_at": known.last_used_at,
                "prev_used_at": known.prev_used_at,
                "country": known.country,
                "region": known.region,
                "city": known.city
            }
        with open(self.out, 'w') as out_file:
            yaml.dump(info, out_file, default_flow_style=False, explicit_start=True)


def get_outfile_content(file):
    """Get the content of the outfile"""
    with open(file) as out_file:
        content = yaml.load(out_file)
    out_file.close()
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
    hostname = None
    try:
        hostname = socket.getfqdn(ip_address)
    except Exception:
        pass
    return hostname


def load_authentications(authfile):
    """Load info from auth file."""
    if not os.path.exists(authfile):
        _LOGGER.critical("File is missing %s", authfile)
        return False
    with open(authfile, "r") as authfile:
        auth = json.loads(authfile.read())

    users = {}
    for user in auth["data"]["users"]:
        users[user["id"]] = user["name"]

    tokens = auth["data"]["refresh_tokens"]

    return users, sorted(tokens, key=lambda i: i['last_used_at'], reverse=True)


class IPAddress:
    """IP Address class."""
    def __init__(self, access_data, users, provider, new=True):
        self.all_users = users
        self.access_data = access_data
        self.provider = provider
        self.ip_address = access_data["last_used_ip"]
        self.last_used_at = access_data["last_used_at"]
        self.prev_used_at = access_data["prev_used_at"]
        self.user_id = access_data.get("user_id")
        self.hostname = None
        self.city = None
        self.region = None
        self.country = None
        self.new_ip = new

    @property
    def username(self):
        """Return the username used for the login."""
        if self.user_id is None:
            return "Unknown"
        elif self.user_id in self.all_users:
            return self.all_users[self.access_data["user_id"]]
        return "Unknown"

    def lookup(self):
        """Look up data for the IP address."""
        self.hostname = get_hostname(self.ip_address)
        geo = get_geo_data(self.ip_address, self.provider)
        if geo["result"]:
            self.country = geo.get("data", {}).get("country_name")
            self.region = geo.get("data", {}).get("region")
            self.city = geo.get("data", {}).get("city")

    def notify(self, hass):
        """Create persistant notification."""
        notify = hass.components.persistent_notification.create
        notify('{} ({}, {}, {})'.format(
            self.ip_address, str(self.country), str(self.region), str(self.city)),
               'New successful login from')
