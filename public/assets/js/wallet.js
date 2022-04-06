var dropdown = document.querySelector(".dropdown");
var menuText = document.querySelector("#menuText");

const toggleDropdown = function (event) {
  event.stopPropagation();
  dropdown.classList.toggle("is-active");

  if (event.target.className == "dropdown-item") {
    var selectedCoin = event.target.textContent.trim();
    menuText.textContent = selectedCoin; //changes text in menuText class
  }
};

async function getCoinIdByAcronym(acronym) {
  //get all coins data
  const response = await fetch(`/api/coins`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const coins = await response.json();
  //find the coin object with a matching id
  let matchingCoin = coins.find(coin => { return coin.acronym === acronym })
  //return only the id
  return matchingCoin.id;
}

async function getWalletId() {
  //get all wallet data for current user
  const response = await fetch(`/api/wallet/currentUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const wallet = await response.json();
  //return only the id
  return wallet.id;
}

async function getCurrentCoinCountbyAcronym(acronym) {
  //get all wallet data for current user
  const response = await fetch(`/api/wallet/currentUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const wallet = await response.json();
  let coins = wallet.owned_coins;
  let matchingCoin = coins.find(coin => { return coin.acronym === acronym })
  //return only the count
  return matchingCoin.coins_wallet.count
}

const getAcronymFromMenuText = function (menuText) {
  //gets the string within a parenthesis 
  let first_index = menuText.indexOf("(");
  let second_index = menuText.indexOf(")");
  let coinAcronym = menuText.substring(first_index + 1, second_index);
  return coinAcronym;
}

async function addToWallet() {
  console.log("Add button clicked")

  //get selected values from page
  const coinAcronym = getAcronymFromMenuText(menuText.textContent)
  let count = parseInt(document.querySelector('.amount-input').value)

  //get the id for the coin
  let CoinId = await getCoinIdByAcronym(coinAcronym)

  //get walletId of logged in user
  let WalletId = await getWalletId()

  //get current number of same coin in user's wallet
  let currentCount = parseInt(await getCurrentCoinCountbyAcronym(coinAcronym))
  console.log("current count of coins: " + currentCount)

  //add new coins to current count of coins
  count = count + currentCount

  console.log("Inserting into wallet Id: " + WalletId + " a coin Id of: " + CoinId + " with a count of: " + count)

  //add coins to wallet
  const response = await fetch(`/api/through`, {
    method: 'POST',
    body: JSON.stringify({
      WalletId,
      CoinId,
      count
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    //refresh the page
    document.location.replace('/wallet');
  } else {
    console.log("Error adding to wallet: " + response.statusText);
  }
}

async function removeFromWallet() {
  console.log("Add button clicked")

  //get selected values from page
  const coinAcronym = getAcronymFromMenuText(menuText.textContent)
  let count = parseInt(document.querySelector('.amount-input').value)

  //get the id for the coin
  let CoinId = await getCoinIdByAcronym(coinAcronym)

  //get walletId of logged in user
  let WalletId = await getWalletId()

  //get current number of same coin in user's wallet
  let currentCount = parseInt(await getCurrentCoinCountbyAcronym(coinAcronym))
  console.log("current count of coins: " + currentCount)

  //subtract coins from current count of coins
  count = currentCount - count

  console.log("Inserting into wallet Id: " + WalletId + " a coin Id of: " + CoinId + " with a count of: " + count)

  //add coins to wallet
  const response = await fetch(`/api/through`, {
    method: 'POST',
    body: JSON.stringify({
      WalletId,
      CoinId,
      count
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    //refresh the page
    document.location.replace('/wallet');
  } else {
    console.log("Error adding to wallet: " + response.statusText);
  }
}

dropdown.addEventListener("click", toggleDropdown);
document.querySelector('.add-btn').addEventListener('click', addToWallet);
document.querySelector('.remove-btn').addEventListener('click', removeFromWallet);