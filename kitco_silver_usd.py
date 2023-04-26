#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests

website = requests.get('https://www.kitco.com/silver-price-today-usa')
soup = BeautifulSoup(website.content, 'html.parser')
my_silver_usa = soup.find(class_ = 'table-price--body-table--overview-bid')
my_silver_usa = my_silver_usa.text
my_silver_usa = my_silver_usa.split()
my_silver_usa = my_silver_usa[1:2]
my_silver_usa = str(my_silver_usa)
my_silver_usa = my_silver_usa.replace("[","")
my_silver_usa = my_silver_usa.replace("]","")
my_silver_usa = my_silver_usa.replace("'","")

#with open('file1.txt', 'w') as f:
#    print(my_silver_usa, file=f)
print(my_silver_usa)
