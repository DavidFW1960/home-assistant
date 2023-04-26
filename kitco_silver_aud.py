#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/silver-price-today-australia')
soup = BeautifulSoup(website.content, 'html.parser')
my_silver_aud = soup.find(class_ = 'table-price--body-table--overview-bid')
my_silver_aud = my_silver_aud.text
my_silver_aud = my_silver_aud.split()
my_silver_aud = my_silver_aud[1:2]
my_silver_aud = str(my_silver_aud)
my_silver_aud = my_silver_aud.replace("[","")
my_silver_aud = my_silver_aud.replace("]","")
my_silver_aud = my_silver_aud.replace("'","")

#with open('file1.txt', 'w') as f:
#    print(my_silver_aud, file=f)
print(my_silver_aud)
