import twint
import pandas as pd
import nest_asyncio
from src.config import Config


class TwitterScraper:
    def __init__(self, username, limit=300,
                 date_since=None, date_until=None):
        self.username = username
        self.limit = limit
        nest_asyncio.apply()
        self.tweets = []
        self.out_path = "./data/" + f"{self.username}.csv"
        self.scrape()

    def scrape(self):
        c = twint.Config()
        c.Username = self.username
        c.Limit = self.limit
        c.Store_object = True
        c.Hide_output = True
        c.Store_csv = True
        c.Output = self.out_path
        twint.run.Search(c)

    def get_tweet_df(self):
        df = pd.DataFrame(self.out_path)[Config.COLUMNS]
        return df
