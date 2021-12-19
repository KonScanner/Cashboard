const supported_times = ["1", "5", "15", "30", "60", "4h", "1D", "D"]
const supported_coins = ["bitcoin", "ethereum", "cardano", "matic-network", "curve-dao-token", "terra-luna", "cosmos", "monero", "solana", "avalanche-2", "chainlink", "fantom", "olympus"];
const supported_stables = ["tether", "usd-coin", "dai", "terrausd", "binance-usd", "magic-internet-money", "true-usd", "frax", "paxos-standard", "origin-dollar", "tether-eurt", "seur", "stasis-eurs"];
let theme_toggler = document.querySelector('#theme_toggler');
let graph = document.getElementById("chart");
/**
 * Charts & chart functions
 */
var opts = {
	series: [],
	// title: {
	// 	text: "Price of asset vs Time",
	// 	style: {
	// 		fontFamily: '"Space Mono", monospace',
	// 		fontWeight: undefined,
	// 		colors: "lightgray"
	// 	}
	// },
	chart: {
		type: 'candlestick',
		height: 450,
		width: "99%",
		zoom: {
			autoScaleYaxis: true
		},
		redrawOnParentResize: true
	},

	dataLabels: {
		enabled: false
	},
	markers: {
		size: 0,
		style: 'hollow',
	},
	xaxis: {
		type: 'datetime',
		tickAmount: 10,
		labels: {
			style: {
				fontFamily: '"Space Mono", monospace',
				fontWeight: undefined,
				colors: "gray"
			}
		}
	},
	yaxis: {
		forceNiceScale: true,
		decimalsInFloat: 2,
		lines: {
			show: true
		},
		opposite: false,
		tickAmount: 10,
		labels: {
			offsetX: -10,
			offsetY: 2,
			rotate: 0,
			style: {
				fontFamily: '"Space Mono", monospace',
				fontWeight: undefined,
				colors: "gray"
			}
		},
		tooltip: {
			enabled: true,
			shared: true,
			custom: [function ({
				seriesIndex,
				dataPointIndex,
				w
			}) {
				return w.globals.series[seriesIndex][dataPointIndex]
			}, function ({
				seriesIndex,
				dataPointIndex,
				w
			}) {
				var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
				var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
				var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
				var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
				return (
					''
				)
			}]
		}

	},
	tooltip: {
		x: {
			show: true,
			format: 'hh:mm - dd MMM yyyy'
		},
	},
	grid: {
		show: true,
		borderColor: '#90A4AE',
		strokeDashArray: 0,
		position: 'back',
		xaxis: {
			lines: {
				show: true
			}
		},
		row: {
			colors: undefined,
			opacity: 0.9
		},
		column: {
			colors: undefined,
			opacity: 0.9
		},
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	},

	noData: {
		text: "Select Presets",
		align: 'center',
		verticalAlign: 'middle',
		offsetX: 0,
		offsetY: 0,
		style: {
			fontFamily: '"Space Mono", monospace',
			fontWeight: undefined,
			colors: "lightgray"
		}
	},
	plotOptions: {
		candlestick: {
			wick: {
				useFillColor: true,
			}
		}
	},
}

var chart = new ApexCharts(
	document.querySelector("#chart"),
	opts
);
chart.render();

function get_chart(data, data_sma, data_ema, symbol, min_date, max_date) {

	var options = {
		series: [{
				name: `${symbol}`,
				data: data,
				type: 'candlestick',
				title: {
					text: `${symbol}`,
				},
			},
			// {
			// 	name: `${symbol}_sma`,
			// 	data: data_sma,
			// 	type: 'line',
			// 	title: {
			// 		text: `${symbol}`,
			// 	},

			// },
			{
				name: `${symbol}_ema_50`,
				data: data_ema,
				type: 'line',
				title: {
					text: `${symbol}`,
				},
				color: 'gray'

			}
		],
		chart: {
			zoom: {
				autoScaleYaxis: true
			},
			redrawOnParentResize: true
		},
		stroke: {
			curve: 'smooth',
			width: [1, 3, 3]
		},

		xaxis: {
			max: max_date,
			min: min_date
		}
	};

	chart.updateOptions(options);
};

function display_symbol_options_html(coins) {
	var mydiv = document.getElementById("dropDownSymbol");
	var newElement = document.createElement('div');
	var str = ''
	for (let k in coins) {
		let coin = coins[k]
		let option = document.createElement("option");
		option.text = coin;
		option.value = k;
		let select = document.getElementById("dropDownSymbol");
		select.appendChild(option);
	}

	newElement.innerHTML = str;
	mydiv.appendChild(newElement);


}

function get_symbol(event) {
	// Gets symbol and time and places them into a hidden input field
	if (event.target.id !== 'dropDownSymbol' & event.target.id !== 'dropDownTime') {
		return null;
	}
	if (event.target.id === 'dropDownSymbol') {
		document.getElementById("HiddenSymbol").value = event.target.value;
	}
	if (event.target.id === 'dropDownTime') {
		document.getElementById("HiddenTime").value = event.target.value;
	}
	if (document.getElementById("HiddenSymbol").value !== "" & document.getElementById("HiddenTime").value !== "") {
		let symbol = document.getElementById("HiddenSymbol").value;
		let time = document.getElementById("HiddenTime").value;
		let to = String(date_to_unix(get_today()))
		let from = String(deal_with_time(time = time, symbol = symbol));
		console.log("to", to, "from", from);

		get_data_with_symbol(symbol = symbol, time = time, from = from, to = to);
	}
}

function get_symbol_on_press() {
	if (document.getElementById("HiddenSymbol").value !== "" & document.getElementById("HiddenTime").value !== "") {
		let symbol = document.getElementById("HiddenSymbol").value;
		let time = document.getElementById("HiddenTime").value;
		let to = String(date_to_unix(get_today()))
		let from = String(deal_with_time(time = time, symbol = symbol));
		console.log("to", to, "from", from);

		get_data_with_symbol(symbol = symbol, time = time, from = from, to = to);
	}
}

/**
 *  TIME AND DATAPREP FUNCTIONS
 */

/**
 * Time & time functions
 */
function get_today() {
	return Date.now();
}

function date_to_unix(date) {
	return Math.floor(date / 1000)
}

function subtractMinutes(date, minutes) {
	return new Date(date - minutes * 60000);
}


function get_conception_date(symbol = "") {

	if (symbol === "AVAX_USDT") {
		const avax_date = new Date('2020-05-21').valueOf()
		return date_to_unix(avax_date);
	}

}

function deal_with_time(time = "", symbol = "") {
	// Makes sure the API is only fetched for the appropriate time ranges that are useful
	let today = get_today()
	if (supported_times.includes(time)) {

		if (time === "") {
			return;
		}
		if (time === "D") {
			if (symbol === "AVAX_USDT") {
				return get_conception_date(symbol)
			}
			return date_to_unix(subtractMinutes(date = today, minutes = 3153604).getTime()); // 18 months
		}
		if (time === "1D") {
			if (symbol === "AVAX_USDT") {
				return get_conception_date(symbol)
			}
			return date_to_unix(subtractMinutes(date = today, minutes = 788401).getTime()); // 18 months

		}
		if (time === "4h") {
			return date_to_unix(subtractMinutes(date = today, minutes = 115200).getTime());
		}
		if (time === "60") {
			return date_to_unix(subtractMinutes(date = today, minutes = 28800).getTime()); // 10 days
		}
		if (time === "30") {
			return date_to_unix(subtractMinutes(date = today, minutes = 14400).getTime()); // 10 days
		}
		if (time === "15") {
			return date_to_unix(subtractMinutes(date = today, minutes = 7200).getTime()); // 5 days

		}
		if (time === "5") {
			return date_to_unix(subtractMinutes(date = today, minutes = 1440).getTime()); // 1 day
		}
		if (time === "1") {
			return date_to_unix(subtractMinutes(date = today, minutes = 144).getTime()); // 1 day
		} else {
			alert("Timeframe issue")
		}
	}
	return;

}

/**
 * UTILS
 */

function check_nill(string) {
	if (string === undefined) {
		return 404;
	} else {
		return string;
	}
}


/**
 * Data prep functions
 */

function prepare_data(data, time) {
	var dates = data.t.map(d => Math.floor(d * 1000));

	let plot_ = []
	for (let i = 0; i < data.o.length; i++) {
		let c_p = [data.o[i], data.h[i], data.l[i], data.c[i]]
		plot_.push([dates[i], c_p])
	}
	return plot_;


}

function avg(arr, idx, range) {
	return sum(arr.slice(idx - range, idx)) / range;
}

function sum(arr) {
	var len = arr.length;
	var num = 0;
	while (len--) num += Number(arr[len]);
	return num;
}

function toFixed(n) {
	return n.toFixed(2);
}


function sma(arr, range, format) {
	if (!Array.isArray(arr)) {
		throw TypeError('expected first argument to be an array');
	}

	var fn = typeof format === 'function' ? format : toFixed;
	var num = range || arr.length;
	var res = [];
	var len = arr.length + 1;
	var idx = num - 1;
	while (++idx < len) {
		res.push(fn(avg(arr, idx, num)));
	}
	return res;
}

function ema(data, period = 21) {
	var k = 2 / (period + 1);
	// first item is just the same as the first item in the input
	let emaArray = [data[0]];
	// for the rest of the items, they are computed with the previous one
	for (var i = 1; i < data.length; i++) {
		emaArray.push(data[i] * k + emaArray[i - 1] * (1 - k));
	}
	return emaArray;
};

function prepare_data_sma(data, timne, period = 20) {
	w_minus_1 = period - 1
	let dates = data.t.slice(w_minus_1, data.t.length);
	dates = dates.map(d => Math.floor(d * 1000));
	let close_values = sma(data.c, period);
	let plot_ = []
	for (let i = 0; i < dates.length; i++) {
		let c_p = [close_values[i]]
		plot_.push([dates[i], c_p])
	}
	return plot_;
}

function prepare_data_ema(data, time, period = 21) {
	w_minus_1 = period - 1
	let dates = data.t.slice(w_minus_1, data.t.length);
	dates = dates.map(d => Math.floor(d * 1000));
	let close_values = ema(data.c, period);
	let plot_ = []
	for (let i = 0; i < dates.length; i++) {
		let c_p = [close_values[i]]
		plot_.push([dates[i], c_p])
	}
	return plot_;
}

function get_data_with_symbol(symbol, time, from, to) {
	// Fetches data, given symbol,time,from,to
	let time_ = time;
	console.log(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time_}&from=${from}&to=${to}`)
	console.log(Date(Math.floor(from * 1000)), Date(Math.floor(to * 1000)))
	fetch(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time_}&from=${from}&to=${to}`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		plot_ = prepare_data(data, time);
		// plot_sma = prepare_data_sma(data, time);
		plot_sma = [];
		plot_ema = prepare_data_ema(data, time, period = 50);
		get_chart(dates = plot_, data_sma = plot_sma, data_ema = plot_ema, symbol = symbol, max_date = dates.max, min_date = dates.min)
	}).catch(function (err) {
		// There was an errr
		console.warn(`Error ${err}`);
	});
}

function coingecko_coin_data_pre(data, coin = "eth") {
	// if (coin === "tether" | coin === "terrausd" | coin === "usd-coin" | coin === "dai" | coin === "tether-eurt") {
	if (in_array(array = supported_coins, string = coin)) {
		document.getElementById(`${coin}_current_price`).innerHTML = check_nill(data.market_data.current_price.usd.toFixed(4) + " $");
	} else {
		document.getElementById(`${coin}_current_price`).innerHTML = check_nill(data.market_data.current_price.usd.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " $");
	}
	document.getElementById(`${coin}_image`).src = check_nill(data.image.large);
	document.getElementById(`${coin}_id`).title = check_nill(data.id);
	var link = document.getElementById(`${coin}_id`)
	link.setAttribute('href', check_nill(data.links.homepage[0]));


	document.getElementById(`${coin}_marketcap_pct`).innerHTML = check_nill(data.market_data.market_cap_change_percentage_24h.toFixed(2) + " %");
	document.getElementById(`${coin}_marketcap`).innerHTML = check_nill(data.market_data.market_cap_change_24h.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " $");
	document.getElementById(`${coin}_total_volume`).innerHTML = check_nill(data.market_data.total_volume.usd.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " $");
}

function coingecko_coin_fetch(coin) {
	fetch(`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=true&sparkline=false`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		coingecko_coin_data_pre(data, coin = coin)
	}).catch(function (err) {
		// There was an errr
		console.warn(`Error ${err}`);
	});
}

function woo_coin_list() {
	fetch(`https://api.woo.org/v4/public/token`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		let ret = woo_list(data);
		display_symbol_options_html(ret);
	}).catch(function (err) {
		// There was an errr
		console.warn(`Error ${err}`);
	});
}

function woo_list(data) {
	const coins = new Object();
	for (let i = 0; i < data.data.rows.length; i++) {
		if (data.data.rows[i]["fullname"] !== "Tether") {
			// Doesn't fix the problem, but it over-writes.
			coins[data.data.rows[i]["balance_token"] + "_USDT"] = data.data.rows[i]["fullname"];
		}
	}

	return coins;

}

function coingecko_marketcap(symbol) {
	if (symbol === "BTC_USDT") {
		return;
	}
	if (symbol === "ETH_USDT") {
		return;
	}
	if (symbol === "ADA_USDT") {
		return;
	} else {
		console.warn(`coingecko_marketcap(${symbol}) -  Not implemented yet`)
	}
}

function in_array(array, string) {
	if (array.indexOf(string) > -1) {
		return false
	} else {
		return true
	}
}

function coins_to_create_html(coin, element = "coins") {
	var mydiv = document.getElementById(element);
	var newElement = document.createElement('div');

	var str = '<hr />'
	str += `<a href="" id=${coin}_id title=""><img id="${coin}_image" class="coin_image" src="" alt=""></a>
			<h4 id="${coin}_current_price" class="marketcap_info"></h4>
			<h4 id="${coin}_marketcap_pct" class="marketcap_info"></h4>
			<h4 id="${coin}_marketcap" class="marketcap_info"></h4>
			<h4 id="${coin}_total_volume" class="marketcap_info"></h4>`
	newElement.innerHTML = str;
	mydiv.appendChild(newElement);

}

function coins_to_fetch() {

	// Coins
	for (let i = 0; i < supported_coins.length; i++) {
		coingecko_coin_fetch(coin = supported_coins[i]);
	}

}

function stables_to_fetch() {

	// Stables
	for (let i = 0; i < supported_stables.length; i++) {
		coingecko_coin_fetch(coin = supported_stables[i]);
	}
}


function coins_to_fetch_initialize() {

	// Coins
	for (let i = 0; i < supported_coins.length; i++) {
		coins_to_create_html(coin = supported_coins[i]);
		coingecko_coin_fetch(coin = supported_coins[i]);
	}

	// Stables
	for (let i = 0; i < supported_stables.length; i++) {
		coins_to_create_html(coin = supported_stables[i], element = "stables")
		coingecko_coin_fetch(coin = supported_stables[i]);
	}
}

function dropdownfunc() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

woo_coin_list();
coins_to_fetch_initialize();

theme_toggler.addEventListener('click', function () {
	document.body.classList.toggle('dark_mode');
	// graph.style.backgroundColor = "#f5f5f5";
	// graph.style.color = "#f5f5f5";
});


window.addEventListener('input', get_symbol, false);