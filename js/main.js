const supported_symbols = new Set(["BTC_USDT", "ETH_USDT", "ADA_USDT", "AVAX_USDT"])
const supported_times = new Set(["5", "15", "30", "1D", "D"])

var opts = {
	series: [],
	title: {
		text: "Price of asset vs Time",
	},
	chart: {
		type: 'candlestick',
		height: 350,
		width: "50%",
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
			offsetX: 0,
			rotate: 0,
		}

	},
	tooltip: {
		x: {
			format: 'hh:mm - dd MMM yyyy'
		}
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
		text: "Loading...",
		align: 'center',
		verticalAlign: 'middle',
		offsetX: 0,
		offsetY: 0,
		style: {
			color: "black",
			fontFamily: undefined
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

function subtractMinutes(date, minutes) {
	return new Date(date - minutes * 60000);
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

		get_data_with_symbol(symbol = document.getElementById("HiddenSymbol").value, time = document.getElementById("HiddenTime").value, from = from, to = to);
	}
}

function get_today() {
	return Date.now();
}

function date_to_unix(date) {
	return Math.floor(date / 1000)
}

function get_conception_date(symbol = "") {

	if (symbol === "AVAX_USDT") {
		const avax_date = new Date('2021-01-21').valueOf()
		return date_to_unix(avax_date);
	}

}

function deal_with_time(time = "", symbol = "") {
	// Makes sure the API is only fetched for the appropriate time ranges that are useful
	let today = get_today()


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
		alert("Something Went Wrong")
	}
	return;

}




function get_chart(data, symbol, min_date, max_date) {

	var options = {
		series: [{
			name: `${symbol}`,
			data: data,
			title: {
				text: `${symbol}`,
			},
		}],
		chart: {
			// id: 'area-datetime',
			type: 'candlestick',
			height: 350,
			zoom: {
				autoScaleYaxis: true
			},
			redrawOnParentResize: true
		},
		xaxis: {
			max: max_date,
			min: min_date
		}
	};

	// let _chart = document.querySelector("#chart");
	// debugger
	// let chart = new ApexCharts(_chart, options);
	// chart.render();
	// chart.updateSeries([{
	// 	name: `${symbol}`,
	// 	data: data
	// }], true);
	chart.updateOptions(options);
};


function prepare_data(data) {
	var dates = data.t.map(d => Math.floor(d * 1000));

	let plot_ = []
	for (let i = 0; i < data.o.length; i++) {
		let c_p = [data.o[i], data.h[i], data.l[i], data.c[i]]
		plot_.push([dates[i], c_p])
	}
	return plot_;
}


function get_data_with_symbol(symbol, time, from, to) {
	// Fetches data, given symbol,time,from,to
	console.log(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time}&from=${from}&to=${to}`)
	console.log(Date(Math.floor(from * 1000)), Date(Math.floor(to * 1000)))
	fetch(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time}&from=${from}&to=${to}`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		plot_ = prepare_data(data);
		get_chart(dates = plot_, symbol = symbol, max_date = dates.max, min_date = dates.min)
	}).catch(function (err) {
		// There was an errr
		console.warn(`Error ${err}`);
	});
}

function get_data_decrypt(per_page) {
	// Fetches data, given news per page
	fetch(`https://api.decrypt.co/content-elasticsearch/posts?_minimal=true&category=news&lang=en-US&offset=0&order=desc&orderby=date&per_page=${per_page}`).then(function (response) {
		return response.json();
	}).then(function (data) {
		// This is the JSON from the response
		return data;
	}).catch(function (err) {
		console.warn(`Error ${err}`);
	});
}

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
// 	if (this.readyState === 4) {
// 		console.log(this.responseText);
// 	}
// });

// xhr.open("GET", "https://pyinvesting.com/fear-and-greed/cash-data");

// xhr.send();

// function searchFunction(element) {
// 	var input, filter, ul, li, a, i, txtValue;
// 	input = document.getElementById("searchID");
// 	filter = input.value.toUpperCase();
// 	if (event.key == 'Enter') {
// 		get_data_with_symbol(filter);
// 	}


// ul = document.getElementsByTagName("ul");
// li = ul[0].getElementsByTagName("li");
// for (i = 0; i < li.length; i++) {
// 	a = li[i];
// 	txtValue = a.textContent || a.innerText;
// 	if (txtValue.toUpperCase().indexOf(filter) > -1) {
// 		li[i].style.display = "";
// 	} else {
// 		li[i].style.display = "none";
// 	}
// }

// var target = document.querySelector("#dropDownSymbol");

// target.addEventListener("mouseover", mOver, false);
// target.addEventListener("mouseout", mOut, false);


// function mOver() {
// 	target.click();
// }

// function mOut() {
// 	target.setAttribute("style", "background-color:green;")
// }

window.addEventListener('input', get_symbol, false);