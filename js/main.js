const supported_symbols = new Set(["BTC_USDT", "ETH_USDT", "ADA_USDT", "AVAX_USDT"])
const supported_times = new Set(["5", "15", "30", "1D", "D"])


function subtractMinutes(date, minutes) {
	return new Date(date - minutes * 60000);
}

// document.addEventListener('input', function (event) {
// 	if (event.target.id !== 'dropDownSymbol') {
// 		return;
// 	}
// 	if (event.target.id === 'dropDownSymbol') {
// 		return event.target.value;
// 		// get_data_with_symbol(symbol = event.target.value, time = "1D");
// 	}
// }, false);



function get_symbol(event) {
	// Gets symbol and time and places them into a hidden input field
	if (event.target.id !== 'dropDownSymbol' & event.target.id !== 'dropDownTime') {
		return null;
	}
	if (event.target.id === 'dropDownSymbol') {
		document.getElementById("HiddenSymbol").value = event.target.value;
		console.log('Symbol:', document.getElementById("HiddenSymbol").value);
	}
	if (event.target.id === 'dropDownTime') {
		document.getElementById("HiddenTime").value = event.target.value;
		console.log('Time:', document.getElementById("HiddenTime").value);
	}
	if (document.getElementById("HiddenSymbol").value !== "" & document.getElementById("HiddenTime").value !== "") {
		let time = document.getElementById("HiddenTime").value;
		let data = deal_with_time(time);
		let from = data[1];
		let to = data[0]
		console.log(to, from);
		get_data_with_symbol(symbol = document.getElementById("HiddenSymbol").value, time = document.getElementById("HiddenTime").value, to = to, from = from);
	}
}

function deal_with_time(time = "") {
	// Makes sure the API is only fetched for the appropriate time ranges that are useful
	let today = Date.now()
	if (time === "") {
		return;
	}
	if (time === "1D") {
		default_window = Math.floor(subtractMinutes(date = today, minutes = 788401).getTime() / 1000); // 18 months
		let _today = Math.ceil(Date.now() / 1000);
		let data = [default_window, _today];
		return data;
	}
	// TODO: implement the rest of the times
	return;
}

window.addEventListener('input', get_symbol, false);



function get_data_with_symbol(symbol, time, from, to) {
	// Fetches data, given symbol,time,from,to
	fetch(`https://api.woo.org/tv/history?symbol=${symbol}&resolution=${time}&from=${from}&to=${to}`).then(function (response) {
		// The API call was successful!
		return response.json();
	}).then(function (data) {
		// This is the JSON from the response
		console.log(data);
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
		console.log(data);
	}).catch(function (err) {
		console.warn(`Error ${err}`);
	});
}

// Example POST method implementation:
function getData(url = 'https://pyinvesting.com/fear-and-greed/cash-data') {

	var xmlHttp = new JSONHttpRequest();
	xmlHttp.open("GET", url, true); // false for synchronous request
	request.setRequestHeader('X-Requested-With', 'JSONHttpRequest');
	xmlHttp.send(null);
	xmlHttp.getElementById("resp").innerText = xhr.responseText;
	return xmlHttp.responseText;

}


function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	request.setRequestHeader('X-Requested-With', 'JSONHttpRequest');
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
// fetch('https://pyinvesting.com/fear-and-greed/cash-data', {
// 	mode: 'cors',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'Authorization': `pyinvesting.com`,
// 	}
// }).then(function (response) {
// 	// The API call was successful!
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		return Promise.reject(response);
// 	}
// }).then(function (data) {
// 	// This is the JSON from our response
// 	console.log(data);
// }).catch(function (err) {
// 	// There was an error
// 	console.warn(err);
// });
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === 4) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://pyinvesting.com/fear-and-greed/cash-data");

xhr.send();

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