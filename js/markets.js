function coingecko_coin_fetch() {
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

function coin_categories(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
}

function coingecko_coin_data_pre(data) {
  // if (coin === "tether" | coin === "terrausd" | coin === "usd-coin" | coin === "dai" | coin === "tether-eurt") {

  document.getElementById(`${coin}_current_price`).innerHTML = check_nill(
    data.market_data.current_price.usd.toFixed(4) + " $"
  );
  document.getElementById(`${coin}_current_price`).innerHTML = check_nill(
    data.market_data.current_price.usd
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
  );
  document.getElementById(`${coin}_image`).src = check_nill(data.image.large);
  document.getElementById(`${coin}_name`).title = check_nill(data.id);
  var link = document.getElementById(`${coin}_id`);
  link.setAttribute("href", check_nill(data.links.homepage[0]));

  document.getElementById(`${coin}_marketcap_pct`).innerHTML = check_nill(
    data.market_data.market_cap_change_percentage_24h.toFixed(2) + " %"
  );
  document.getElementById(`${coin}_marketcap`).innerHTML = check_nill(
    data.market_data.market_cap_change_24h
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
  );
  document.getElementById(`${coin}_total_volume`).innerHTML = check_nill(
    data.market_data.total_volume.usd
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $"
  );
}

function coins_to_create_html(id) {
  var mydiv = document.getElementById(element);
  var newElement = document.createElement("div");

  var str = "<hr />";
  str += `<a href="" id=${id}_name title=""><img id="${id}_image" class="coin_image" src="" alt=""></a>
			<h4 id="${id}_marketcap" class="marketcap_info"></h4>
			<h4 id="${id}_marketcap_pct" class="marketcap_info"></h4>
			<h4 id="${id}_marketcap" class="marketcap_info"></h4>
			<h4 id="${id}_total_volume" class="marketcap_info"></h4>`;
  newElement.innerHTML = str;
  mydiv.appendChild(newElement);
}

coingecko_coin_fetch();
