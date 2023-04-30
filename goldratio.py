#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/gold-price-today-australia')
soup = BeautifulSoup(website.content, 'html.parser')
goldratio = soup.find(class_ = 'table-price--footer-ratios').text.split()
goldratio = float(str(goldratio[5:6]).replace("[","").replace("]","").replace("'","").replace(",",""))

print(goldratio)
