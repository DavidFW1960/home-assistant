/*
Idea stolen from https://gist.github.com/thomasloven/2a37152725c582fec4420ecedb65ebe3

Add this to your configuration.yaml
frontend:
  extra_module_url:
    - /local/ThemeOverride.js

And put the following into <config-dir>/www/ThemeOverride.js
*/

document.documentElement.style.setProperty('--ha-card-border-radius', '10px');