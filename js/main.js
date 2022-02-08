const supported_times = ["1", "5", "15", "30", "60", "4h", "1D", "D"]
const supported_coins = ["bitcoin", "ethereum", "cardano", "matic-network", "curve-dao-token", "terra-luna", "anchor-protocol", "mirror-protocol", "astroport", "kujira", "cosmos", "monero", "solana", "avalanche-2", "chainlink", "fantom", "olympus", "the-sandbox"];
const supported_stables = ["tether", "usd-coin", "binance-usd", "terrausd", "dai", "frax", "true-usd", "paxos-standard", "fei-usd", "liquity-usd", "neutrino", "alchemix-usd", "origin-dollar", "magic-internet-money", "tether-eurt", "seur", "stasis-eurs", "tether-gold"];
let graph = document.getElementById("chart");
let theme_toggler = document.querySelector('#theme_toggler');
/**
 * Charts & chart functions
 */




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
	if (event.target.id !== 'dropDownSymbol' & event.target.id !== 'dropDownTime' & event.target.id !== "dropDownPlotType") {
		return null;
	}
	if (event.target.id === 'dropDownSymbol') {
		document.getElementById("HiddenSymbol").value = event.target.value;
	}
	if (event.target.id === 'dropDownPlotType') {
		document.getElementById("HiddenPlotType").value = event.target.value;
	}
	if (event.target.id === 'dropDownTime') {
		document.getElementById("HiddenTime").value = event.target.value;
	}
	if (document.getElementById("HiddenSymbol").value !== "" & document.getElementById("HiddenTime").value !== "" & document.getElementById("HiddenPlotType").value !== "") {
		let symbol = document.getElementById("HiddenSymbol").value;
		let time = document.getElementById("HiddenTime").value;
		let plotType = document.getElementById("HiddenPlotType").value;
		let to = String(date_to_unix(get_today()))
		let from = String(deal_with_time(time = time, symbol = symbol));
		console.log("to", to, "from", from);
		console.log(plotType)
		get_data_with_symbol(symbol = symbol, time = time, from = from, to = to, plotType = plotType);
	}
}

function get_symbol_on_press() {
	if (document.getElementById("HiddenSymbol").value !== "" & document.getElementById("HiddenTime").value !== "") {
		let symbol = document.getElementById("HiddenSymbol").value;
		let time = document.getElementById("HiddenTime").value;
		let plotType = document.getElementById("HiddenPlotType").value;
		let to = String(date_to_unix(get_today()))
		let from = String(deal_with_time(time = time, symbol = symbol));
		console.log("to", to, "from", from);

		get_data_with_symbol(symbol = symbol, time = time, from = from, to = to, plotType = plotType);
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
		let c_p = [dates[i], data.o[i], data.h[i], data.l[i], data.c[i], data.v[i]]
		plot_.push(c_p)
	}
	return plot_;


}

function heineken_data(data) {
	var dates = data.t.map(d => Math.floor(d * 1000));

	let plot_ = []
	for (let i = 0; i < data.o.length; i++) {
		if (i === 0) {
			var open = (data.o[i] + data.c[i]) / 2;

		} else {
			var open = (data.o[i - 1] + data.c[i - 1]) / 2;
		}
		var close = (data.o[i] + data.h[i] + data.l[i] + data.c[i]) / 4;

		var high = Math.max(data.h[i], data.o[i], data.c[i]);
		var low = Math.min(data.l[i], data.o[i], data.c[i]);
		var c_p = [dates[i], open, high, low, close, data.v[i]]
		plot_.push(c_p)
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

function get_chart(data, symbol) {

	var mainOptions = {
		rangeSelector: {
			selected: 1
		},
		navigator: {
			series: {
				color: Highcharts.getOptions().colors[0]
			}
		},
		series: [{
				type: 'candlestick',
				name: `${symbol}`,
				data: data
			},
			Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')
		]
	}

	var darcUnica = {
		colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
			'#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
		],
		chart: {
			backgroundColor: {
				linearGradient: {
					x1: 0,
					y1: 0,
					x2: 1,
					y2: 1
				},
				stops: [
					[0, '#2a2a2b'],
					[1, '#3e3e40']
				]
			},
			style: {
				fontFamily: '\'Unica One\', sans-serif'
			},
			plotBorderColor: '#606063'
		},
		title: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase',
				fontSize: '20px'
			}
		},
		subtitle: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase'
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: '#E0E0E3'
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			title: {
				style: {
					color: '#A0A0A3'

				}
			}
		},
		yAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: '#E0E0E3'
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			tickWidth: 4,
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.85)',
			style: {
				color: '#F0F0F0'
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					color: '#F0F0F3',
					style: {
						fontSize: '13px'
					}
				},
				marker: {
					lineColor: '#333'
				}
			},
			boxplot: {
				fillColor: '#505053'
			},
			candlestick: {
				color: 'green',
				upColor: 'red',
				tickWidth: 4,
			},
		},
		legend: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			itemStyle: {
				color: '#E0E0E3'
			},
			itemHoverStyle: {
				color: '#FFF'
			},
			itemHiddenStyle: {
				color: '#606063'
			},
			title: {
				style: {
					color: '#C0C0C0'
				}
			}
		},
		credits: {
			style: {
				color: '#666'
			}
		},
		labels: {
			style: {
				color: '#707073'
			}
		},
		drilldown: {
			activeAxisLabelStyle: {
				color: '#F0F0F3'
			},
			activeDataLabelStyle: {
				color: '#F0F0F3'
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				theme: {
					fill: '#505053'
				}
			}
		},
		// scroll charts
		rangeSelector: {
			buttonTheme: {
				fill: '#505053',
				stroke: '#000000',
				style: {
					color: '#CCC'
				},
				states: {
					hover: {
						fill: '#707073',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: '#000003',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					}
				}
			},
			inputBoxBorderColor: '#505053',
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: 'silver'
			}
		},
		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(255,255,255,0.1)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			},
			xAxis: {
				gridLineColor: '#505053'
			}
		},
		scrollbar: {
			barBackgroundColor: '#808083',
			barBorderColor: '#808083',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: '#606063',
			buttonBorderColor: '#606063',
			rifleColor: '#FFF',
			trackBackgroundColor: '#404043',
			trackBorderColor: '#404043'
		}
	};
	Highcharts.stockChart('chart', Highcharts.merge(mainOptions, darcUnica));
};

function get_data_with_symbol(symbol, time, from, to, plotType) {
	// Fetches data, given symbol,time,from,to
	let time_ = time;
	console.log(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time_}&from=${from}&to=${to}`)
	console.log(Date(Math.floor(from * 1000)), Date(Math.floor(to * 1000)))
	fetch(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time_}&from=${from}&to=${to}`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		if (plotType === "Candle") {
			var plot_ = prepare_data(data, time);
		} else {
			var plot_ = heineken_data(data, time);
		}
		// plot_sma = prepare_data_sma(data, time);
		plot_sma = [];
		plot_ema = prepare_data_ema(data, time, period = 50);
		var chart = get_chart(data = plot_, symbol = `${symbol}`);
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
			coins["SPOT_" + data.data.rows[i]["balance_token"] + "_USDT"] = data.data.rows[i]["fullname"];
		}
	}

	return coins;

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


function sleep(ms) {
	// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function refresh_every_t(t = 30) {
	while (true) {
		await sleep(t * 1000);
		get_symbol_on_press();
		coins_to_fetch();
		stables_to_fetch();
	}
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
refresh_every_t();



window.addEventListener('input', get_symbol, false);

theme_toggler.addEventListener('click', function () {
	if (document.getElementById("refreshBtn").classList.contains('invert') | document.getElementById("refreshBtn1").classList.contains('invert') | document.getElementById("refreshBtn2").classList.contains('invert')) {
		document.getElementById("refreshBtn").classList.remove("invert");
		document.getElementById("refreshBtn1").classList.remove("invert");
		document.getElementById("refreshBtn2").classList.remove("invert");
	} else {
		document.getElementById("refreshBtn").classList.add("invert");
		document.getElementById("refreshBtn1").classList.add("invert");
		document.getElementById("refreshBtn2").classList.add("invert");
	}
	document.body.classList.toggle('dark_mode');
});