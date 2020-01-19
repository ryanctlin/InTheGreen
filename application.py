from flask import Flask, request, jsonify
from flask_api import FlaskAPI
import numpy as np
import pandas as pd
from python_scripts.scraping_loop import get_data
from python_scripts.analysis import esg_ordering
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

    esg_average = 100 - esg_average
    esg_average = "{0:.1f}".format(esg_average)
    return esg_average

@app.route("/api/v1/update", methods=['GET','POST'])
def update():
    get_data()
    esg_ordering()
    return "Update Successful"

@app.route("/api/v1/esg_demo", methods=['GET','POST'])
def esg_demo():
    esg_average = str(16.3)
    return esg_average

@app.route("/api/qna/best", methods=['GET','POST'])
def best_sustainable():
    n = 5
    df = pd.read_csv('./python_scripts/data/decr_sustainability.csv', delimiter=',')
    ticker_list=[]
    for i in range(0,n):
        ticker_list.append(df['0'][i])
    return str(ticker_list)

@app.route("/api/qna/worst", methods=['GET','POST'])
def worst_sustainable():
    n = 5
    df = pd.read_csv('./python_scripts/data/incr_sustainability.csv', delimiter=',')
    ticker_list=[]
    for i in range(0,n):
        ticker_list.append(df['0'][i])
    return str(ticker_list)


# @app.route("/api/qna", methods=['GET','POST'])
# def test_message(uuid):
#     content = request.json
#     return jsonify({"uuid":content})


if __name__ == "__main__":
    app.run(debug=True)