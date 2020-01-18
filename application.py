from flask import Flask
import numpy as np
import pandas as pd
from python_scripts.scraping_loop import get_data
app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/api/v1/get_esg_average",methods=['GET'])
def get_esg_average():
    df = pd.read_csv('./python_scripts/data/esg_scores.csv', delimiter=',')
    esg_average = 0
    weight_sum = 0

    #Compute sum of weights of all tickers with ESG data
    for i in range(0,len(df)):
        if not np.isnan(df['2'][i]):
            weight_sum += df['1'][i]

    #Compute weighted average of ESG data
    for i in range(0,len(df)):
        if not np.isnan(df['2'][i]):
            esg_average += df['1'][i]/weight_sum * df['2'][i]

    return str(esg_average)

@app.route("/api/v1/update", methods=['GET'])
def update():
    get_data()

app.run()