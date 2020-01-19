import numpy as np
import pandas as pd

def esg_ordering():
    df = pd.read_csv('./python_scripts/data/esg_scores.csv', delimiter=',')
    weighted_esg = []
    weight_sum = 0

    #Compute sum of weights of all tickers with ESG data
    for i in range(0, len(df)):
        if not np.isnan(df['2'][i]):
            weight_sum += df['1'][i]

    #Compute weighted average of ESG data
    for i in range(0, len(df)):
        if not np.isnan(df['2'][i]):
            weighted_esg.append(df['1'][i] / weight_sum * df['2'][i])
        else:
            weighted_esg.append(None)

    #Append weighted average ESG as new column and sort by decreasing sustainability (ascending weighted risk score)
    df['c3'] = weighted_esg
    sorted_df = df.sort_values(by=['2'],ascending=True)
    sorted_df2 = df.sort_values(by=['2'],ascending=False)

    #Export to csv file
    sorted_df.to_csv('./python_scripts/data/decr_sustainability.csv', index=False)
    sorted_df2.to_csv('./python_scripts/data/incr_sustainability.csv', index=False)
