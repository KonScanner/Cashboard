let expression = "test";
console.log(`string text ${expression}`);
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
		// This is the JSON from our response
		console.log(data);
	}).catch(function (err) {
		// There was an errr
		consoleo.warn('Something went wrong.', err);
	});
}

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