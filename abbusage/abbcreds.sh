#!/bin/bash

cd "$(dirname "$0")"

clear
echo "This script will prompt you for your Aussie Broadband (ABB) and Home Assistant Login Credentials"

if [[ -e "abbcreds.json" ]]
then 
  abbcreds=$(cat abbcreds.json)
fi

echo "Enter your ABB Username, followed by [ENTER]:"
abblogin=$(echo "$abbcreds" | jq -r '.abblogin')
read -e -i "$abblogin" -p "ABB Username: " input
abblogin="${input:-$abblogin}"

echo ""
echo "Enter your ABB Password, followed by [ENTER]:"
abbpassword=$(echo "$abbcreds" | jq -r '.abbpassword')
read -e -i "$abbpassword" -p "ABB Password: " input
abbpassword="${input:-$abbpassword}"

cookie=abbcookie.txt
curl --silent -c $cookie -d "username=$abblogin" -d "password=$abbpassword" --url 'https://myaussie-auth.aussiebroadband.com.au/login' > abbtoken.json
usageid=$(curl --silent -b $cookie --url "https://myaussie-api.aussiebroadband.com.au/customer" |jq -r '.services.NBN[0].service_id')
echo ""
echo "The Usage ID we detect is shown."
echo "Only change the Usage ID if it is detected incorrectly otherwise press [Enter]"
echo "Enter your ABB Service ID, followed by [ENTER]:"
read -e -i "$usageid" -p "Detected ABB Service ID: " input
usageid="${input:-$usageid}"

echo ""
echo "Enter your Home Assistant Server IP/URL and port eg http://10.90.11.100:8123, followed by [ENTER]:"
server=$(echo "$abbcreds" | jq -r '.server')
if [ -z "$server" ] 
then 
  server=http://10.90.11.100:8123
else
  server=$(echo "$server")
fi
read -e -i "$server" -p "Home Assistant Server: " input
server="${input:-$server}"

echo ""
echo "Enter your Home Assistant Long Access Token (184 characters), followed by [ENTER]:"
token=$(echo "$abbcreds" | jq -r '.token')
read -e -i "$token" -p "HA Long Lived Token: " input
token="${input:-$token}"

echo ""
echo "Enter your Home Assistant Server Entity Picture eg /local/icons/abb/abb.png (default) followed by [ENTER]:"
entitypicture=$(echo "$abbcreds" | jq -r '.entitypicture')
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
echo ""
echo "Your credentials have been saved"
