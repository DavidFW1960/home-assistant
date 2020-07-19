/*
Add a link to the sidebar to any path in Home Assistant

Put this file in <config>/www/panel-redirect.js

In configuration.yaml:

panel_custom:
  - name: panel-redirect
    # url_path needs to be unique for each panel_custom config
    url_path: redirect-server-controls
    sidebar_title: Server Controls
    sidebar_icon: mdi:server
    module_url: /local/panel-redirect.js
    config:
      # Where you want to redirect to
      target: /config/server_control
*/
class PanelRedirect extends HTMLElement {
  connectedCallback() {
    if (this._info) {
      this._navigate();
    }
  }

  set panel(info) {
    this._info = info;

    if (this.isConnected) {
      this._navigate();
    }
  }

  _navigate() {
    history.replaceState(null, "", this._info.config.target);
    const event = new Event("location-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { replace: true };
    this.dispatchEvent(event);
  }
}

customElements.define("panel-redirect", PanelRedirect);
