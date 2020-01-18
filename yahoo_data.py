import requests
from bs4 import BeautifulSoup
import re

def ticker_ESG(ticker):
    """This function accepts a ticker input and outputs its Total ESG Risk Score"""
    #Generate URL
    working_url = 'https://uk.finance.yahoo.com/quote/'+str(ticker).upper()+'/sustainability?p='+str(ticker).upper()
    total_ESG = scrape_yahoo(working_url)
    return total_ESG

def scrape_yahoo(url):
    """This function checks and accepts a Yahoo finance URL and outputs the Total ESG Risk Score as an int """

    #GET page and convert content to bs4 soup
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')


    #Find class containing ESG risk score from 0-100, cast to string
    total_ESG = str(soup.findAll('div', {"class": "Fz(36px) Fw(600) D(ib) Mend(5px)"}))

    #Extract ESG score using regex, with error handling
    if total_ESG != '[]':
        total_ESG = int(re.search('data-reactid="20">(.+?)</div>', total_ESG).group(1))
    else:
        total_ESG = None

    return total_ESG

#Testing
#print(ticker_ESG('aapl'))
