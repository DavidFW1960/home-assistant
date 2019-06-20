#!/bin/bash

cd "$(dirname "$0")"

secrets=$(cat secrets.yaml)
# secrets=$(cat /usr/share/hassio/homeassistant/secrets.yaml)

latitude=$(echo "$secrets" | grep my_latitude | sed 's/my_latitude: //')
longitude=$(echo "$secrets" | grep my_longitude | sed 's/my_longitude: //')
elevation=$(echo "$secrets" | grep my_elevation | sed 's/my_elevation: //')
timezone=$(echo "$secrets" | grep my_timezone | sed 's/my_timezone: //')

sunrisesunset="$(python3 suncomponent.py "$latitude" "$longitude" "$elevation" "$timezone")"

sunrise1=$(echo "$sunrisesunset" | grep sunrise1 | sed 's/sunrise1 //' | sed 's/ /T/' )
sunset1=$(echo "$sunrisesunset" | grep sunset1 | sed 's/sunset1 //' | sed 's/ /T/' )
daylength1=$(echo "$sunrisesunset" | grep Daylength1 | sed 's/Daylength1 //' )
sunrise2=$(echo "$sunrisesunset" | grep sunrise2 | sed 's/sunrise2 //' | sed 's/ /T/' )
sunset2=$(echo "$sunrisesunset" | grep sunset2 | sed 's/sunset2 //' | sed 's/ /T/' )
daylength2=$(echo "$sunrisesunset" | grep Daylength2 | sed 's/Daylength2 //' )
sunrise3=$(echo "$sunrisesunset" | grep sunrise3 | sed 's/sunrise3 //' | sed 's/ /T/' )
sunset3=$(echo "$sunrisesunset" | grep sunset3 | sed 's/sunset3 //' | sed 's/ /T/' )
daylength3=$(echo "$sunrisesunset" | grep Daylength3 | sed 's/Daylength3 //' )

# Build JSON output
sunrisesunset='{"state":"","attributes":{"sunrise_yesterday":"'"$sunrise1"'","sunset_yesterday":"'"$sunset1"'","daylength_yesterday":"'"$daylength1"'","sunrise_today":"'"$sunrise2"'","sunset_today":"'"$sunset2"'","daylength_today":"'"$daylength2"'","sunrise_tomorrow":"'"$sunrise3"'","sunset_tomorrow":"'"$sunset3"'","daylength_tomorrow":"'"$daylength3"'"}}'

# Home Assistant Config
creds=$(cat abbusage/abbcreds.json)
# creds=$(cat /usr/share/hassio/homeassistant/abbusage/abbcreds.json)
server=$(echo "$creds" | jq -r '.server')
token=$(echo "$creds" | jq -r '.token')

# Publish to HA with token
curl -X POST -H "Authorization: Bearer $token" \
     -H "Content-Type: application/json" \
     -d "$sunrisesunset" \
     "$server"/api/states/sensor.sunrisesunset
