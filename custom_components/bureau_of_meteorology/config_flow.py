"""Config flow for BOM."""
import logging

import voluptuous as vol

from homeassistant import config_entries, core, exceptions
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE
import homeassistant.helpers.config_validation as cv

from .const import (CONF_WEATHER_NAME,
                    CONF_FORECASTS_BASENAME,
                    CONF_FORECASTS_CREATE,
                    CONF_FORECASTS_DAYS,
                    CONF_FORECASTS_MONITORED,
                    CONF_OBSERVATIONS_BASENAME,
                    CONF_OBSERVATIONS_CREATE,
                    CONF_OBSERVATIONS_MONITORED,
                    CONF_WARNINGS_CREATE,
                    CONF_WARNINGS_BASENAME,
                    DOMAIN,
)
from .PyBoM.collector import Collector

_LOGGER = logging.getLogger(__name__)


class ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for BOM."""
    VERSION = 2
    CONNECTION_CLASS = config_entries.CONN_CLASS_CLOUD_POLL

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        data_schema = vol.Schema({
            vol.Required(CONF_LATITUDE, default=self.hass.config.latitude): float,
            vol.Required(CONF_LONGITUDE, default=self.hass.config.longitude): float,
        })

        errors = {}
        if user_input is not None:
            try:
                # Create the collector object with the given long. and lat.
                self.collector = Collector(
                    user_input[CONF_LATITUDE],
                    user_input[CONF_LONGITUDE],
                )

                # Save the user input into self.data so it's retained
                self.data = user_input

                # Populate observations and daily forecasts data
                await self.collector.async_update()

                # Move onto the next step of the config flow
                return await self.async_step_weather_name()

            except Exception:
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        # If there is no user input or there were errors, show the form again, including any errors that were found with the input.
        return self.async_show_form(
            step_id="user", data_schema=data_schema, errors=errors
        )

    async def async_step_weather_name(self, user_input=None):
        """Handle the locations step."""
        data_schema = vol.Schema({
            vol.Required(CONF_WEATHER_NAME, default=self.collector.locations_data["data"]["name"]): str,
        })

        errors = {}
        if user_input is not None:
            try:
                # Save the user input into self.data so it's retained
                self.data.update(user_input)

                return await self.async_step_sensors_create()

            except CannotConnect:
                errors["base"] = "cannot_connect"
            except Exception:
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        # If there is no user input or there were errors, show the form again, including any errors that were found with the input.
        return self.async_show_form(
            step_id="weather_name", data_schema=data_schema, errors=errors
        )

    async def async_step_sensors_create(self, user_input=None):
        """Handle the observations step."""
        data_schema = vol.Schema({
            vol.Required(CONF_OBSERVATIONS_CREATE, default=True): bool,
            vol.Required(CONF_FORECASTS_CREATE, default=True): bool,
            vol.Required(CONF_WARNINGS_CREATE, default=True): bool,
        })

        errors = {}
        if user_input is not None:
            try:
                # Save the user input into self.data so it's retained
                self.data.update(user_input)

                # Move onto the next step of the config flow
                if self.data[CONF_OBSERVATIONS_CREATE]:
                    return await self.async_step_observations_monitored()
                elif self.data[CONF_FORECASTS_CREATE]:
                    return await self.async_step_forecasts_monitored()
                elif self.data[CONF_WARNINGS_CREATE]:
                    return await self.async_step_warnings_basename()
                else:
                    return self.async_create_entry(title=self.collector.locations_data["data"]["name"], data=self.data)

            except CannotConnect:
                errors["base"] = "cannot_connect"
            except Exception:
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        # If there is no user input or there were errors, show the form again, including any errors that were found with the input.
        return self.async_show_form(
            step_id="sensors_create", data_schema=data_schema, errors=errors
        )

    async def async_step_observations_monitored(self, user_input=None):
        """Handle the observations monitored step."""
        monitored = {"temp": "Temperature",
                     "temp_feels_like": "Temperature Feels Like",
                     "rain_since_9am": "Rain Since 9am",
                     "humidity": "Humidity",
                     "wind_speed_kilometre": "Wind Speed Kilometre",
                     "wind_speed_knot": "Wind Speed Knot",
                     "wind_direction": "Wind Direction",
                     "gust_speed_kilometre": "Gust Speed Kilometre",
                     "gust_speed_knot": "Gust Speed Knot",
        }

        data_schema = vol.Schema({
            vol.Required(CONF_OBSERVATIONS_BASENAME, default=self.collector.observations_data["data"]["station"]["name"]): str,
            vol.Required(CONF_OBSERVATIONS_MONITORED): cv.multi_select(monitored),
        })

        errors = {}
        if user_input is not None:
            try:
                self.data.update(user_input)

                # Move onto the next step of the config flow
                if self.data[CONF_FORECASTS_CREATE]:
                    return await self.async_step_forecasts_monitored()
                elif self.data[CONF_WARNINGS_CREATE]:
                    return await self.async_step_warnings_basename()
                else:
                    return self.async_create_entry(title=self.collector.locations_data["data"]["name"], data=self.data)

            except CannotConnect:
                errors["base"] = "cannot_connect"
            except Exception:
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        # If there is no user input or there were errors, show the form again, including any errors that were found with the input.
        return self.async_show_form(
            step_id="observations_monitored", data_schema=data_schema, errors=errors
        )

    async def async_step_forecasts_monitored(self, user_input=None):
        """Handle the forecasts monitored step."""
        monitored = {"temp_max": "Max. Temperature",
                     "temp_min": "Min. Temperature",
                     "extended_text": "Extended Text",
                     "icon_descriptor": "Icon Descriptor",
                     "mdi_icon": "MDI Icon",
                     "short_text": "Short Text",
                     "uv_category": "UV Category",
                     "uv_max_index": "UV Max Index",
                     "uv_start_time": "UV Protection Start Time",
                     "uv_end_time": "UV Protection End Time",
                     "rain_amount_min": "Rain Amount Min.",
                     "rain_amount_max": "Rain Amount Max.",
                     "rain_amount_range": "Rain Amount Range",
                     "rain_chance": "Rain Chance",
                     "fire_danger": "Fire Danger",
                     "now_now_label": "Now Now Label",
                     "now_temp_now": "Now Temp Now",
                     "now_later_label": "Now Later Label",
                     "now_temp_later": "Now Temp Later",
                     "astronomical_sunrise_time": "Sunrise Time",
                     "astronomical_sunset_time": "Sunset Time",
        }

        data_schema = vol.Schema({
            vol.Required(CONF_FORECASTS_BASENAME, default=self.collector.locations_data["data"]["name"]): str,
            vol.Required(CONF_FORECASTS_MONITORED): cv.multi_select(monitored),
            vol.Required(CONF_FORECASTS_DAYS): vol.All(vol.Coerce(int), vol.Range(0, 7)),
        })

        errors = {}
        if user_input is not None:
            try:
                self.data.update(user_input)

                if self.data[CONF_WARNINGS_CREATE]:
                    return await self.async_step_warnings_basename()
                return self.async_create_entry(title=self.collector.locations_data["data"]["name"], data=self.data)

            except CannotConnect:
                errors["base"] = "cannot_connect"
            except Exception:
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        # If there is no user input or there were errors, show the form again, including any errors that were found with the input.
        return self.async_show_form(
            step_id="forecasts_monitored", data_schema=data_schema, errors=errors
        )

    async def async_step_warnings_basename(self, user_input=None):
        """Handle the forecasts monitored step."""
        data_schema = vol.Schema({
            vol.Required(CONF_WARNINGS_BASENAME, default=self.collector.locations_data["data"]["name"]): str,
        })

        errors = {}
        if user_input is not None:
            try:
                self.data.update(user_input)
                return self.async_create_entry(title=self.collector.locations_data["data"]["name"], data=self.data)
            except CannotConnect:
                errors["base"] = "cannot_connect"
            except Exception:
                _LOGGER.exception("Unexpected exception")
                errors["base"] = "unknown"

        # If there is no user input or there were errors, show the form again, including any errors that were found with the input.
        return self.async_show_form(
            step_id="warnings_basename", data_schema=data_schema, errors=errors
        )


class CannotConnect(exceptions.HomeAssistantError):
    """Error to indicate we cannot connect."""
