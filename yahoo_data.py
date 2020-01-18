import requests
from bs4 import BeautifulSoup
import re

def scrape_contents(url):
    """This function checks and accepts a Yahoo finance URL, """

    #GET page and convert content to bs4 soup
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    total_ESG = soup.findAll('div', {"class": "Fz(36px) Fw(600) D(ib) Mend(5px)"})
    #total_ESG = total_ESG.get_text()  # Extract text from bs4 tag object
    return str(total_ESG)

result = scrape_contents('https://uk.finance.yahoo.com/quote/AM/sustainability?p=AM')

result = re.search('data-reactid="20">(.+?)</div>', result).group(1)
print(result)