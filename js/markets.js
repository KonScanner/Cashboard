base_url = "https://api.coingecko.com/api/v3"
coin_list_url = `${base_url}/coins/list`
coin_categories_url = `${base_url}/coins/categories`
coin_get_all = `${base_url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250`

function check_nill(item) {
	if (item === undefined) {
		return true;
	} else {
		return false;
	}
}

function return_nill_string(item) {
	if (!check_nill(item)) {
		return Number(item);
	} else {
		return "";
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Data
function get_categories() {
	fetch(`${coin_categories_url}`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		// debugger
		display_category_options_html(data);
	}).catch(function (err) {
		// There was an errr
		console.warn(`Error ${err}`);
	});
}

function get_coins_with_category(category) {
	fetch(`${base_url}/coins/markets?vs_currency=usd&category=${category}&order=market_cap_desc&per_page=250&page=1&sparkline=false`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		url_helper_mktcap(data, element = "coinBody");
	}).catch(function (err) {
		// There was an errr
		console.warn(`Error ${err}`);
	});
}

function get_category(event) {

	if (event.target.id === 'dropCategory') {
		document.getElementById("HiddenCategory").value = event.target.value;
	}
	if (document.getElementById("HiddenCategory").value !== "" | document.getElementById("HiddenCategory").value !== "smart-contract-platform") {
		let category = document.getElementById("HiddenCategory").value;
		get_coins_with_category(category = category);
	}
}

function url_helper_mktcap(data, element = "coinBody") {
	var coins = document.getElementById(element);
	var static_url = "https://www.coingecko.com/en/coins"
	var str = "";
	for (let i = 0; i < data.length; i++) {
		let market_cap = return_nill_string(data[i].market_cap);
		let total_volume = return_nill_string(data[i].total_volume);
		var mktcapVolume = "";
		if (market_cap !== "" && total_volume !== "") {
			var mktcapVolume = Math.round((market_cap / total_volume) * 100) / 100;
		}
		str += `<tr>
				<td><a href="${static_url}/${data[i].id}" id=${data[i].id}_id title=${data[i].symbol}><img id="${data[i].id}_image" src=${data[i].image} alt=""></a></td>
				<td>${numberWithCommas(market_cap)}</td>
				<td>${numberWithCommas(total_volume)}</td>
				<td>${numberWithCommas(mktcapVolume)}</td>
			</tr>`
	}
	coins.innerHTML = str;
}

function display_category_options_html(data) {
	var mydiv = document.getElementById("dropCategory");
	var newElement = document.createElement('div');
	var str = ''

	for (let i = 0; i < data.length; i++) {
		let id = data[i].id;
		let name = data[i].name;
		let option = document.createElement("option");
		option.text = name;
		option.value = id;
		let select = document.getElementById("dropCategory");
		select.appendChild(option);
	}

	newElement.innerHTML = str;
	mydiv.appendChild(newElement);

}

window.addEventListener('input', get_category, false);
get_coins_with_category(category = document.getElementById("HiddenCategory").value)
get_categories();
theme_toggler.addEventListener('click', function () {
	document.body.classList.toggle('dark_mode');
});