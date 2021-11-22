import requests as req
import time
import datetime

today = datetime.date.today()
from_date = datetime.date(2019,1,1)
unix_today = int(time.mktime(today.timetuple()))
unix_from = int(time.mktime(from_date.timetuple()))
symbol = "ETH_USDT"
request_url = f"https://api.woo.org/tv/history?symbol={symbol}&resolution=1D&from={unix_from}&to={unix_today}"

payload={}
headers = {}

response = req.request("GET", request_url, headers=headers, data=payload)

print(response.text)

