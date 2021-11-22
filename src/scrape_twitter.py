import twint
import pandas as pd
import nest_asyncio
from src.config import Config


class TwitterScraper(Config):
    def __init__(self, username=None,search=None, limit=300,
                 date_since=None, date_until=None):
        super().__init__()
        self.username = username
        self.search = search
        self.limit = limit
        nest_asyncio.apply()
        self.tweets = []
        if username is not None:
            self.out_path = "./data/" + f"{self.username}.csv"
            self.scrape_user()
        else:
            self.out_path = "./data/" + f"{self.search}.csv"
            self.scrape_search()

    def scrape_user(self):
        c = twint.Config()
        c.Username = self.username
        c.Limit = self.limit
        c.Store_object = True
        c.Hide_output = True
        c.Count = True
        c.Pandas = True
        c.Store_csv = True
        c.Custom_csv = Config.COLUMNS
        c.Output = self.out_path
        twint.run.Search(c)
        self.df = twint.storage.panda.Tweets_df[Config.COLUMNS]
        
    def scrape_search(self):
        c = twint.Config()
        c.Search = self.search
        c.Limit = self.limit
        c.Store_object = True
        c.Hide_output = True
        c.Count = True
        c.Pandas = True
        c.Store_csv = True
        c.Custom_csv = Config.COLUMNS
        c.Output = self.out_path
        twint.run.Search(c)
        self.df = twint.storage.panda.Tweets_df[Config.COLUMNS_SEARCH]
