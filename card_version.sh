#!/bin/bash

cd "$(dirname "$0")"
lovelace_cards=$(cat ui-lovelace.yaml)

darksky_card=$(echo "$lovelace_cards" | grep "dark-sky-weather-card" | head -1 | sed "s/.*\/dark-sky-weather-card.js?v=//")

# Build JSON output
card_installed_string='{"state":"","attributes":{"darksky":"'"$darksky_card"'"}}'
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