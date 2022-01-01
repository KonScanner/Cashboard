var mybutton = document.getElementById("myBtn");
let theme_toggler = document.querySelector('#theme_toggler');
const bar_height = Number(window.innerHeight * (window.innerHeight / document.body.offsetHeight))
const height_to_scroll = (bar_height / 3); // CHANGE WHEN MORE PICS
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction()
};

function scrollFunction() {
	if (document.documentElement.scrollTop > height_to_scroll & document.body.scrollTop < 1.5 * height_to_scroll) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function copyright_update() {
	var today = new Date();
	var year = today.getFullYear();
	var paragraph = document.getElementById("copyright");
	paragraph.innerHTML = 'Copyright &copy; ' + year + ' <a href="https://github.com/KonScanner">KonScanner</a><br>All Rights Reserved';
}
copyright_update()


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