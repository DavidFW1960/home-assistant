"""CommunityAPI View for HACS."""
import logging
from aiohttp import web
from homeassistant.components.http import HomeAssistantView

from custom_components.hacs.const import DOMAIN_DATA
from custom_components.hacs.frontend.views import error_view
from custom_components.hacs.frontend.elements import (
    style,
    header,
    Generate,
    warning_card,
)

_LOGGER = logging.getLogger(__name__)


class CommunityElement(HomeAssistantView):
    """View to serve the overview."""

    requires_auth = False

    url = r"/community_element/{path}"
    name = "community_element"

    def __init__(self, hass):
        """Initialize overview."""
        self.hass = hass
        self.element = None
        self.generate = None
        self.message = None

    async def get(self, request, path):  # pylint: disable=unused-argument
        """View to serve the overview."""
        _LOGGER.debug("Trying to serve %s", path)
        self.message = request.rel_url.query.get("message")

        try:
            html = await self.element_view(path)

        except Exception as error:  # pylint: disable=broad-except
            _LOGGER.error("Ups... There was an isse generating the page %s", error)
            html = await error_view()

        # Show the content
        return web.Response(body=html, content_type="text/html", charset="utf-8")

    async def element_view(self, element):
        """element_view."""
        _LOGGER.debug("Trying to generate view for %s", element)

        self.element = self.hass.data[DOMAIN_DATA]["elements"][element]
        self.generate = Generate(self.hass, self.element)

        content_style = await style()
        content_header = await header()
        main_content = await self.element_view_content()

        return """
          {content_style}
          {content_header}
          <div class='container''>
            {main_content}
          </div>
        """.format(
            content_style=content_style,
            content_header=content_header,
            main_content=main_content,
        )

    async def element_view_content(self):
        """Generate the content for a single element."""

        # Generate objects
        authors = await self.generate.authors()
        avaiable_version = await self.generate.avaiable_version()
        changelog = await self.generate.changelog()
        description = await self.generate.description()
        element_note = await self.generate.element_note()
        info = await self.generate.info()
        installed_version = await self.generate.installed_version()
        last_update = await self.generate.last_update()
        main_action = await self.generate.main_action()
        name = self.element.name
        open_plugin = await self.generate.open_plugin()
        repo = await self.generate.repo()
        reload_icon = await self.generate.reload_icon()
        restart_pending = await self.generate.restart_pending()
        uninstall = await self.generate.uninstall()

        content = ""

        # Show info message
        if self.message is not None and self.message != "None":
            content += await warning_card(self.message)

        content += """
          {restart_pending}
          <div class="row">
            <div class="col s12">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">{name} {reload_icon}</span>
                  {description}
                  {installed_version}
                  {avaiable_version}
                  {last_update}
                  {info}
                  </br>
                  {authors}
                  {element_note}
                </div>
                <div class="card-action">
                  {main_action}
                  {changelog}
                  {repo}
                  {open_plugin}
                  {uninstall}
                </div>
              </div>
            </div>
          </div>
        """.format(
            authors=authors,
            avaiable_version=avaiable_version,
            changelog=changelog,
            description=description,
            element_note=element_note,
            info=info,
            installed_version=installed_version,
            last_update=last_update,
            main_action=main_action,
            name=name,
            open_plugin=open_plugin,
            repo=repo,
            reload_icon=reload_icon,
            restart_pending=restart_pending,
            uninstall=uninstall,
        )

        return content
