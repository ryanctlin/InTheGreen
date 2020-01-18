import requests
from bs4 import BeautifulSoup
import re

def scrape_sp500():
    """This function exports live composition and weights of S&P500 index from https://www.slickcharts.com/sp500 """

    #GET page and convert content to bs4 soup
    page = requests.get('https://www.slickcharts.com/sp500')
    soup = BeautifulSoup(page.content, 'html.parser')


    #Split string
    scraped = str(soup.findAll('td'))
    scraped = scraped.split(", ")
    # print(scraped)

    #Extract tickers
    tickers = scraped[2:len(scraped)-1:7]
    for num, text in enumerate(tickers):
        text = str(re.search('<td><a href="/symbol/(.+?)">', text).group(1))
        tickers[num] = text

    #Extract weights
    weights = scraped[3:len(scraped) - 1:7]
    for num, weight in enumerate(weights):
        weight = float(re.search('<td>(.+?)</td>', weight).group(1))
        weights[num] = weight

    #Output as dictionary
    result = list(zip(tickers,weights))
    return(result)

#Testing
#print(scrape_sp500())
