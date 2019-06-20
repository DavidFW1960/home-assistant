#!/usr/local/bin/python3

import sys
import os
from datetime import date
from datetime import timedelta
import astral
sys.path.append(os.getcwd())

latitude = float(sys.argv[1])
longitude = float(sys.argv[2])
elevation = float(sys.argv[3])
timezone = sys.argv[4]

loc = astral.Location(('Location', 'Region', latitude, longitude, timezone, elevation))

yesterday = date.today() - timedelta(days = 1)
today = date.today()
tomorrow = date.today() + timedelta(days = 1)

yesterday = loc.sun(yesterday)
daylength = yesterday['sunset'] - yesterday['sunrise']
print ("Daylength1", daylength)
for k in ["sunrise", "sunset"]:
    print (k+"1", yesterday[k])
	
today = loc.sun(today)
daylength = today['sunset'] - today['sunrise']
print ("Daylength2", daylength)
for k in ["sunrise", "sunset"]:
    print (k+"2", today[k])

tomorrow = loc.sun(tomorrow)
daylength = tomorrow['sunset'] - tomorrow['sunrise']
print ("Daylength3", daylength)
for k in ["sunrise", "sunset"]:
    print (k+"3", tomorrow[k])
