import pandas as pd


class PreprocessData:
    def __init__(self, data: pd.DataFrame):
        self.data = data

    def clear_tags(self):
        self.data['tweet'] = self.data['tweet'].str.replace(
            r'@[a-zA-Z0-9_]+', '', regex=True)
        return self.data
