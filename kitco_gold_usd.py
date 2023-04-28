#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/gold-price-today-usa')
soup = BeautifulSoup(website.content, 'html.parser')

my_gold_usd = soup.find(class_ = 'table-price--body-table--overview-bid').text.split()
my_gold_usd = float(str(my_gold_usd[1:2]).replace("[","").replace("]","").replace("'","").replace(",",""))

print(my_gold_usd)
