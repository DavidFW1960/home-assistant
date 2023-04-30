#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests
import json

website = requests.get('https://www.marketwatch.com/investing/index/dxy')
soup = BeautifulSoup(website.content, 'html.parser')
my_dxy = json.loads(soup.find('script', type='application/ld+json').text)

print(my_dxy['price'])