from flask import Flask
from flask_api import FlaskAPI
import numpy as np
import pandas as pd
from python_scripts.scraping_loop import get_data
app = FlaskAPI(__name__)

@app.route("/api/v1/get_esg_average", methods=['GET','POST'])
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

    esg_average = "{0:.1f}".format(esg_average)
    return esg_average

@app.route("/api/v1/update", methods=['GET','POST'])
def update():
    get_data()
    return "Update Successful"

if __name__ == "__main__":
    app.run(debug=True)