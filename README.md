# InTheGreen
## Inspiration
Passive investment strategies such as index funds have grown significantly over the past few years, accounting for nearly half of the current funds market value. However, this has led to a disconnect between everyday investors and the companies which they implicitly support. We believe that by updating users on key sustainability issues in their portfolio through a gamified webapp, we can help them make more informed decisions about their investments.


## What it does
At the centre of our project is a webapp frontend, which displays your own personal 'investment tree' that is linked with your stock portfolio. For demonstration purposes, the portfolio is modelled after the S&P500 index which is appropriate given the popularity of similar index-tracking funds. The health of the tree is directly correlated to the sustainability impact of the user's portfolio, and encourages the user to take care of the tree by making responsible investment decisions.

A Python backend hosted on Microsoft Azure tracks the fund composition in real-time and webscrapes environmental, social and corporate governance (ESG) risk scores from Yahoo Finance. A weighted average and other comparisons are computed and made available to the webapp through a Flask-API. 

The webapp also has a chatbot, which was trained using Microsoft QnA Maker to answer basic queries and analyse the user's portfolio from a sustainability perspective. A recommender AI model was also trained using Azure, which would suggest new stocks for the user to purchase based on peers with similar interests in areas such as gender equality, ethics, fairtrade, and LGBTQ+ rights.


## What's next for InTheGreen
- Incorporate social elements, where users can add their friends and work together to maintain a 'forest' consisting of their individual trees/portfolios
- Expand considered sources with non-numerical data such as company announcements and shareholder resolution votes, as well as creating a newsfeed for users to find out more about any changes
- Perform time-series modelling over historical company data and predict portfolio profitability and sustainability
- Complete integration of recommender feature
