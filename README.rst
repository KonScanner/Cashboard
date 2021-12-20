======================================================
`Cashboard <https://konscanner.github.io/Cashboard/>`_
======================================================

Dashboard for crypto-related content. (Work in progress)


About:
------
The reason for creating this is a quick and easy way for me to get my hands dirty with vanilla `js` again, as well as create something that could be meaningful to use as a day-to-day dashboard when I would like to check a crypto trend quickly and not through a centralized exchange.

Integrated APIs include:
    - `Coingecko <http://coingecko.com/>`_
    - `WooX <https://x.woo.org/>`_


Todos:
------
    - Add More calculations/metrics on the side or on other pages.
    - Add APIs that give interesting data & could be integrated into future versions of the project:
        **LunarCrush**:
            - https://lunarcrush.com/ Fetch api for info
            - https://api.lunarcrush.com/v2
            - "https://api.lunarcrush.com/v2?data=assets&key={API_KEY_HERE}&symbol=BTC"
            - https://towardsdatascience.com/top-5-best-cryptocurrency-apis-for-developers-32475d2eb749
        **Mesari**:
            - https://data.messari.io/api
    - Make all operations async
    - Find a way to disallow spam refresh so coingecko does not temp-ban.

INFEASIBILITIES:
----------------
    - Currently using `ApexCharts <https://apexcharts.com/docs/installation/>`_ which do not support Candlestick graph + multiple lines. This is the reason why I am not able to create multiple indicators or tools on top of the graph.


Contributing:
-------------
    - Feel free to contribute whatever you'd like in a fork on a new branch and create a merge request!
    - There is a priority on the Todo list first, but any contribution would be welcome.