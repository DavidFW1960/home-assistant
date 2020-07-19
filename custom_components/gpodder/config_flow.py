"""Adds config flow for gPodder."""
from homeassistant import config_entries
import voluptuous as vol

from custom_components.gpodder.const import (
    CONF_NAME,
    CONF_PASSWORD,
    CONF_USERNAME,
    CONF_DEVICE,
    DEFAULT_NAME,
    DOMAIN,
)


class GpodderFlowHandler(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for gPodder."""

    VERSION = 1
    CONNECTION_CLASS = config_entries.CONN_CLASS_CLOUD_POLL

    def __init__(self):
        """Initialize."""
        self._errors = {}

    async def async_step_user(self, user_input=None):
        """Handle a flow initialized by the user."""
        self._errors = {}
        if user_input is not None:
            return self.async_create_entry(
                title=user_input[CONF_DEVICE], data=user_input
            )

        return await self._show_config_form(user_input)

    async def _show_config_form(self, user_input):
        """Show the configuration form to edit location data."""
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_USERNAME): str,
                    vol.Required(CONF_PASSWORD): str,
                    vol.Required(CONF_DEVICE): str,
                    vol.Required(CONF_NAME, default=DEFAULT_NAME): str,
                }
            ),
            errors=self._errors,
        )
