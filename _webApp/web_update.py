"""
@author: T.T. Ouzounellis Kavlakonis

Update images on HTML website
"""

import bs4
import time

filename = "C://Users//theod//Documents//Coding Projects//hackcambridge-2020//_webApp//main.html"
filename = "http://127.0.0.1:5500/_webApp/main.html"
change_tree(level=3)
    # Open the file.
    with open(filename, "r") as fp:
        soup = bs4.BeautifulSoup(fp, "html.parser") # Or BeautifulSoup(fp, "lxml")
        # Iterate over all the text found in the document.
        soup.find(id="tree-img")['src'] = "images/stage-"+str(level)+"-tree.png"
    # Write the file.
    with open(filename, "wb") as file:
        file.write(soup.prettify("utf-8"))