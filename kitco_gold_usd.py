#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/gold-price-today-usa')
soup = BeautifulSoup(website.content, 'html.parser')
my_gold_usd = soup.find(class_ = 'table-price--body-table--overview-bid')
my_gold_usd = my_gold_usd.text
my_gold_usd = my_gold_usd.split()
my_gold_usd = my_gold_usd[1:2]
my_gold_usd = str(my_gold_usd)
my_gold_usd = my_gold_usd.replace("[","")
my_gold_usd = my_gold_usd.replace("]","")
my_gold_usd = my_gold_usd.replace("'","")

#with open('file1.txt', 'w') as f:
#    print(my_gold_usd, file=f)
print(my_gold_usd)
