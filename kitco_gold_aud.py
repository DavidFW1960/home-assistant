#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/gold-price-today-australia')
soup = BeautifulSoup(website.content, 'html.parser')
my_gold_aud = soup.find(class_ = 'table-price--body-table--overview-bid')
my_gold_aud = my_gold_aud.text
my_gold_aud = my_gold_aud.split()
my_gold_aud = my_gold_aud[1:2]
my_gold_aud = str(my_gold_aud)
my_gold_aud = my_gold_aud.replace("[","")
my_gold_aud = my_gold_aud.replace("]","")
my_gold_aud = my_gold_aud.replace("'","")

#with open('file1.txt', 'w') as f:
#    print(my_gold_aud, file=f)
print(my_gold_aud)
