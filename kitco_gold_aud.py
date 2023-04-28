#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/gold-price-today-australia')
soup = BeautifulSoup(website.content, 'html.parser')

my_gold_aud = soup.find(class_ = 'table-price--body-table--overview-bid').text.split()
my_gold_aud = float(str(my_gold_aud[1:2]).replace("[","").replace("]","").replace("'","").replace(",",""))

print(my_gold_aud)

