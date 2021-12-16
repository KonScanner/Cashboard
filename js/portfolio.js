window.userWalletAddress = null
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')
const title = document.getElementById("main_title_center");

function toggleButton() {
	if (!window.ethereum) {
		loginButton.style.display = "none";
		loginButton.innerText = 'MetaMask is not installed';
		loginButton.style.backgroundColor = "gray";
		return false
	}

	loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
	loginButton.innerHTML = "Login with Metamsk";
	loginButton.style.display = "block";
	loginButton.style.backgroundColor = "green";
	title.innerHTML = "<u>Metamask:</u>"
	// const accounts = await window.ethereum.request({
	// 		method: 'eth_requestAccounts'
	// 	})
	// 	.catch((e) => {
	// 		console.error(e.message)
	// 		return
	// 	})
	const accounts = await window.ethereum.request({
		method: "wallet_requestPermissions",
		params: [{
			eth_accounts: {}
		}]
	}).then(() => ethereum.request({
		method: 'eth_requestAccounts'
	}))

	const account = accounts[0];
	if (!accounts) {
		return
	}

	window.userWalletAddress = accounts[0]
	userWallet.innerText = window.userWalletAddress
	loginButton.innerText = 'Sign out of MetaMask'

	loginButton.removeEventListener('click', loginWithMetaMask)
	setTimeout(() => {
		loginButton.addEventListener('click', signOutOfMetaMask)
	}, 200)
}

function signOutOfMetaMask() {
	window.userWalletAddress = null
	userWallet.innerText = ''
	loginButton.innerText = 'Sign in with MetaMask'

	loginButton.removeEventListener('click', signOutOfMetaMask)
	setTimeout(() => {
		loginButton.addEventListener('click', loginWithMetaMask)
	}, 200)
}

window.addEventListener('DOMContentLoaded', () => {
	toggleButton()
});