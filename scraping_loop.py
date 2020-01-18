import pandas as pd
from sp500_data import scrape_sp500
from yahoo_data import ticker_ESG

#Obtain tickers and weights
snp = scrape_sp500()

#Recursively obtain ESG scores for each ticker, collate into list with format [symbol, weight, ESG_score]
data = []
for item in snp:
    esg_score = ticker_ESG(item[0])
    data.append([item[0], item[1], esg_score])

#Export to csv file
df = pd.DataFrame(data)
print(df)
df.to_csv('./data/esg_scores.csv', index=False)