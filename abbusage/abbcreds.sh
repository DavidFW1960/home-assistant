#!/bin/bash

cd "$(dirname "$0")"

echo "This script will prompt you for your Aussie Broadband (ABB) and Home Assistant Login Credentials"

if [[ -e "abbcreds.json" ]]
then 
  abbcreds=$(cat abbcreds.json)
fi

echo "Enter your ABB Username, followed by [ENTER]:"
abblogin=$(echo "$abbcreds" | jq '.["abblogin"]')
abblogin=$(echo "$abblogin" | sed 's/.$//g')
abblogin=$(echo $abblogin | cut -c2-)
read -e -i "$abblogin" -p "ABB Username: " input
abblogin="${input:-$abblogin}"

echo "Enter your ABB Password, followed by [ENTER]:"
abbpassword=$(echo "$abbcreds" | jq '.["abbpassword"]')
abbpassword=$(echo "$abbpassword" | sed 's/.$//g')
abbpassword=$(echo $abbpassword | cut -c2-)
read -e -i "$abbpassword" -p "ABB Password: " input
abbpassword="${input:-$abbpassword}"

echo "Enter your ABB Service ID, followed by [ENTER]:"
usageid=$(echo "$abbcreds" | jq '.["usageid"]')
usageid=$(echo "$usageid" | sed 's/.$//g')
usageid=$(echo $usageid | cut -c2-)
read -e -i "$usageid" -p "ABB Service ID: " input
usageid="${input:-$usageid}"

echo "Enter your Home Assistant Server IP/URL and port eg http://10.90.11.100:8123, followed by [ENTER]:"
server=$(echo "$abbcreds" | jq '.["server"]')
server=$(echo "$server" | sed 's/.$//g')
server=$(echo $server | cut -c2-)
if [ -z "$server" ] 
then 
  server=http://10.90.11.100:8123
else
  server=$(echo "$server")
fi
read -e -i "$server" -p "Home Assistant Server: " input
server="${input:-$server}"

echo "Enter your Home Assistant Long Access Token (184 characters), followed by [ENTER]:"
token=$(echo "$abbcreds" | jq '.["token"]')
token=$(echo "$token" | sed 's/.$//g')
token=$(echo $token | cut -c2-)
read -e -i "$token" -p "HA Long Lived Token: " input
token="${input:-$token}"

echo "Enter your Home Assistant Server Entity Picture eg /local/icons/abb/abb.png (default) followed by [ENTER]:"
entitypicture=$(echo "$abbcreds" | jq '.["entitypicture"]')
entitypicture=$(echo "$entitypicture" | sed 's/.$//g')
entitypicture=$(echo $entitypicture | cut -c2-)
if [ -z "$entitypicture" ]
then
  entitypicture=/local/icons/abb/abb.png
else
  entitypicture=$entitypicture
fi
read -e -i "$entitypicture" -p "Entity Picture: " input
entitypicture="${input:-$entitypicture}"

abbcreds='{"abblogin":"'"$abblogin"'","abbpassword":"'"$abbpassword"'","usageid":"'"$usageid"'","server":"'"$server"'","token":"'"$token"'","entitypicture":"'"$entitypicture"'"}'
echo $abbcreds  > abbcreds.json

cookie=abbcookie.txt
curl -c $cookie -d "username=$abblogin" -d "password=$abbpassword" --url 'https://myaussie-auth.aussiebroadband.com.au/login' > abbtoken.json
