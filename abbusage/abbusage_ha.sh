#!/bin/bash

cd "$(dirname "$0")"

# Checking credentials have been entered
if [[ -e "abbcreds.json" ]]
then
  abbcreds=$(cat abbcreds.json)
else
  echo "EXITING. *****Credentials not found.***** Please run abbcreds.sh script to set up user details"
  exit
fi

# Aussie Broadband Details
usageid=$(echo "$abbcreds" | jq -r '.usageid')

# Check Cookie has more than half life till expiry
epoch_expire=$(grep 'TRUE' abbcookie.txt)
epoch_expire=$(echo $epoch_expire | cut -d' ' -f5 -)
todaydatetime=$(date +%s)
abbtoken=$(cat abbtoken.json)
refreshTokenExpires=$(echo "$abbtoken" | jq '.expiresIn')
refreshTokenExpires=$(($refreshTokenExpires / 2))
daysleftcookie=$(($epoch_expire - $todaydatetime - $refreshTokenExpires))
if [[ $daysleftcookie < 0 ]]
then 
  refreshToken=$(echo "$abbtoken" | jq -r '.refreshToken')
  curl -c abbcookie.txt -b abbcookie.txt -d "refreshToken=$refreshToken" -X PUT --url 'https://myaussie-auth.aussiebroadband.com.au/login' > abbtoken.json
fi

# Home Assistant Config
server=$(echo "$abbcreds" | jq -r '.server')
token=$(echo "$abbcreds" | jq -r '.token')
entitypicture=$(echo "$abbcreds" | jq -r '.entitypicture')

# Retrieving ABB Usage Data
cookie=abbcookie.txt
abbusagestring=$(curl -b $cookie --url "https://myaussie-api.aussiebroadband.com.au/broadband/$usageid/usage")

# Get Variables from String
usedMb=$(echo "$abbusagestring" | jq '.usedMb')
downloadedMb=$(echo "$abbusagestring" | jq '.downloadedMb')
uploadedMb=$(echo "$abbusagestring" | jq '.uploadedMb')
remainingMb=$(echo "$abbusagestring" | jq '.remainingMb')
daysTotal=$(echo "$abbusagestring" | jq '.daysTotal')
daysRemaining=$(echo "$abbusagestring" | jq '.daysRemaining')
lastUpdated=$(echo "$abbusagestring" | jq -r '.lastUpdated')

# Calculate Dates
todaydatetime=$(date -Is)
lastUpdatedISO=$(echo "$todaydatetime" |sed "s/${todaydatetime:11:8}/${lastUpdated:11:8}/g")
lastUpdated=$(date -d "$lastUpdated" +%s)
daysRemainingEpochs=$(($daysRemaining*86400))
nextRollover=$(($lastUpdated + $daysRemainingEpochs))
nextRollover=$(date -d @"$nextRollover" -Is)
nextRollover=$(echo "$nextRollover" |sed "s/${nextRollover:11:8}/00:00:00/g")
lastUpdated=$lastUpdatedISO
nextRollover=$(echo "$nextRollover" | sed "s/.\{2\}$/:&/")
nextRollover=$(echo "$nextRollover" | sed "s/::/:/g")
lastUpdated=$(echo "$lastUpdated" | sed "s/.\{2\}$/:&/")
lastUpdated=$(echo "$lastUpdated" | sed "s/::/:/g")

# Build daysUsed from daysTotal and daysRemaining
daysUsed=$(echo "$(($daysTotal - $daysRemaining))")

# Build JSON output
abbusagestring='{"state":"","attributes":{"usage":"","usedMb":'"$usedMb"',"downloadedMb":'"$downloadedMb"',"uploadedMb":'"$uploadedMb"',"remainingMb":'"$remainingMb"',"daysTotal":'"$daysTotal"',"daysRemaining":'"$daysRemaining"',"lastUpdated":"'"$lastUpdated"'","nextRollover":"'"$nextRollover"'","daysUsed":'"$daysUsed"',"friendly_name":"ABB Usage","icon":"mdi:blank","entity_picture":"'"$entitypicture"'"}}'

# Publish to HA with token

curl -X POST -H "Authorization: Bearer $token" \
     -H "Content-Type: application/json" \
     -d "$abbusagestring" \
     "$server"/api/states/sensor.abb_usage
