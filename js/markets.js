// Utilities

function check_nill(string) {
  if (string === undefined) {
    return 404;
  } else {
    return string;
  }
}

// Data
function coingecko_market_fetch() {
  fetch(`https://api.coingecko.com/api/v3/coins/categories`)
    .then(function (response) {
      // The API call was successful!
      return response.json();
    })
    .then(function (data) {
      coin_categories(data);
    })
    .catch(function (err) {
      // There was an errr
      console.warn(`Error ${err}`);
    });
}

function get_marketcap() {
  fetch(`https://www.coingecko.com/market_cap/total_charts_data?locale=en&vs_currency=usd`)
    .then(function (response) {
      // The API call was successful!
      return response.json();
    })
    .then(function (data) {
      market_cap_pre(data);
    })
    .catch(function (err) {
      // There was an errr
      console.warn(`Error ${err}`);
    });
}

function coin_categories(data) {
  for (let i = 0; i < data.length; i++) {
    markets_to_create_html(id = data[i].id);
    coingecko_markets_populate(data[i], data[i].id);
  }
}

function market_cap_pre(data) {
  debugger
  console.log(data);
}

function markets_to_create_html(id, element = "markets") {
  var mydiv = document.getElementById(element);
  var newElement = document.createElement("div");
  var str = "<hr />";
  str += `<a href="" id=${id}_id class="market_id" title=""><img id="${id}_image" class="coin_image2" src="" alt=""><img id="${id}_image2" class="coin_image2" src="" alt=""><img id="${id}_image3" class="coin_image2" src="" alt=""></a>
      <h4 id=${id}_name></h4>
			<h4 id="${id}_updated" class="marketcap_info"></h4>
			<h4 id="${id}_market_cap_change_24h" class="marketcap_info"></h4>
			<h4 id="${id}_marketcap" class="marketcap_info"></h4>
			<h4 id="${id}_volume_24h" class="marketcap_info"></h4>`;
  newElement.innerHTML = str;
  mydiv.appendChild(newElement);
}

function coingecko_markets_populate(data, id) {
  document.getElementById(`${id}_id`).title = check_nill(data.id);
  document.getElementById(`${id}_name`).innerHTML = check_nill(data.name); // .title
  document.getElementById(`updated_at`).innerHTML = check_nill(Date(data.updated_at));
  document.getElementById(`${id}_market_cap_change_24h`).innerHTML = check_nill(
    data.market_cap_change_24h.toFixed(2) + " %"
  );
  document.getElementById(`${id}_marketcap`).innerHTML = check_nill(
    data.market_cap
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
  );

  document.getElementById(`${id}_volume_24h`).innerHTML = check_nill(
    data.volume_24h
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
  );
  // document.getElementById(`${id}_current_price`).innerHTML = check_nill(
  //   data.market_data.current_price.usd
  //     .toFixed(2)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
  // );
  if (data.top_3_coins !== undefined) {
    document.getElementById(`${id}_image`).src = check_nill(data.top_3_coins[0]);
    document.getElementById(`${id}_image2`).src = check_nill(data.top_3_coins[1]);
    document.getElementById(`${id}_image3`).src = check_nill(data.top_3_coins[2]);
  }

  // var link = document.getElementById(`${coin}_id`);
  // link.setAttribute("href", check_nill(data.links.homepage[0]));
}


function markets_to_fetch_initialize() {

  // Markets
  for (let i = 0; i < supported_stables.length; i++) {
    markets_to_create_html(coin = supported_stables[i], element = "markets")

  }
  // coingecko_markets_fetch();
}


// markets_to_fetch_initialize();
coingecko_market_fetch();
// get_marketcap();