#!/bin/bash

cd "$(dirname "$0")"
lovelace_cards=$(cat ui-lovelace.yaml)

darksky_card=$(echo "$lovelace_cards" | grep "dark-sky-weather-card" | head -1 | sed "s/.*\/dark-sky-weather-card.js?v=//")
mini_media=$(echo "$lovelace_cards" | grep "mini-media-player-bundle" | head -1 | sed "s/.*\/mini-media-player-bundle.js?v=//")
mini_graph=$(echo "$lovelace_cards" | grep "mini-graph-card-bundle" | head -1 | sed "s/.*\/mini-graph-card-bundle.js?v=//")
button_card=$(echo "$lovelace_cards" | grep "button-card" | head -1 | sed "s/.*\/button-card.js?v=//")
template_card=$(echo "$lovelace_cards" | grep "config-template-card" | head -1 | sed "s/.*\/config-template-card.js?v=//")
podcast=$(echo "$lovelace_cards" | grep "podcast-card" | head -1 | sed "s/.*\/podcast-card.js?v=//")

# Build JSON output
card_installed_string='{"state":"","attributes":{"darksky":"'"$darksky_card"'","minimedia":"'"$mini_media"'","minigraph":"'"$mini_graph"'","button_card":"'"$button_card"'","template_card":"'"$template_card"'","podcast":"'"$podcast"'"}}'
# echo $card_installed_string

# Home Assistant Config
creds=$(cat abbusage/abbcreds.json)
server=$(echo "$creds" | jq -r '.server')
token=$(echo "$creds" | jq -r '.token')
# echo $server
# echo $token

# Publish to HA with token
curl -X POST -H "Authorization: Bearer $token" \
     -H "Content-Type: application/json" \
     -d "$card_installed_string" \
     "$server"/api/states/sensor.lovelace_card_installed