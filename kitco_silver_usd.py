#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/silver-price-today-usa')
soup = BeautifulSoup(website.content, 'html.parser')

my_silver_usd = soup.find(class_ = 'table-price--body-table--overview-bid').text.split()
my_silver_usd = float(str(my_silver_usd[1:2]).replace("[","").replace("]","").replace("'","").replace(",",""))

print(my_silver_usd)