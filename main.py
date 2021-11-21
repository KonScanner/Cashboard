from src.scrape_twitter import TwitterScraper
import pandas as pd
from src.config import Config
from src.preprocess_data import PreprocessData

if __name__ == "__main__":
    # scraper = TwitterScraper("danku_r", limit=100)
    df = pd.read_csv("data/danku_r.csv")[Config.COLUMNS]
    pp = PreprocessData(df)
    pp.clear_tags()
    # print(scraper.tweets, dir(scraper.tweets._output))
