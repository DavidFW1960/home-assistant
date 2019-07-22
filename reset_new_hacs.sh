#!/bin/bash
cd "$(dirname "$0")"
sed -i 's#"new": true#"new": false#g' .storage/hacs
