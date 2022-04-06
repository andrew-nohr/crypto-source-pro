let dropdown = document.querySelector(".dropdown")
let menuText = document.querySelector("#menuText")
let walletTable = document.querySelector(".table")
let coinLayerApiKey = "adf0c97a6bc7712feea1fc05da4edb58"
let coinLayerBaseURL = "http://api.coinlayer.com/api/live?access_key=" + coinLayerApiKey

const toggleDropdown = function (event) {
  event.stopPropagation();
  dropdown.classList.toggle("is-active")

  if (event.target.className == "dropdown-item") {
    var selectedCoin = event.target.textContent.trim()
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
  let first_index = menuText.indexOf("(")
  let second_index = menuText.indexOf(")")
  let coinAcronym = menuText.substring(first_index + 1, second_index)
  return coinAcronym
}

async function getCoinLayerDataBySymbol(symbol) {
  const coinLayerURL =
    "http://api.coinlayer.com/api/live?access_key=" +
    coinLayerApiKey +
    "&Symbols=" +
    symbol;

  console.log("Fetching: " + coinLayerURL)
  let response = await fetch(coinLayerURL)
  // Check if response is OK and if it is, load response as json
  if (response.ok) {
    let coinLayerData = await response.json()
    // check if we recieved data back and if we did, return
    if (coinLayerData != "" && coinLayerData != null) {
      return coinLayerData
    } else {
      return Promise.reject("API did not return an OK response.")
    }
  }
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

async function getAllWalletValues() {
  //setup the currency formatter
  let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  //get all the elements that contain values we need to fetch
  let fetchValues = walletTable.querySelectorAll('[class^="fetch-value-"]')

  fetchValues.forEach(async element => {
    //trim the value from the element class name
    //assumes the class name starts with "fetch-value-"
    let symbol = element.className.substring(12)

    //fetch the value
    const coinLayerURL = coinLayerBaseURL + "&Symbols=" + symbol;
    console.log("fetching " + coinLayerURL)
    let response = await fetch(coinLayerURL)
    // Check if response is OK and if it is, load response as json
    if (response.ok) {
      let coinLayerData = await response.json()
      // check if we recieved data back and update the page
      let currentCalcValueElement = walletTable.querySelector('.calc-value-' + symbol)
      if (coinLayerData != "" && coinLayerData != null && coinLayerData.success === 'true') {
        let currentCoinValue = parseFloat(Object.values(coinLayerData.rates))
        let currentCoinCount = parseFloat(walletTable.querySelector('.count-value-' + symbol).textContent)
        let currentCalcValue = walletTable.querySelector('.calc-value-' + symbol)

        //update current value and calc value on page
        element.textContent = formatter.format(currentCoinValue)
        currentCalcValueElement.textContent = formatter.format(currentCoinValue * currentCoinCount)
      } else {
        element.textContent = "Error getting current rate"
        currentCalcValueElement.textContent = "Error getting holdings value"
      }
    }
  })
}

window.addEventListener('load', getAllWalletValues)
dropdown.addEventListener("click", toggleDropdown);
document.querySelector('.add-btn').addEventListener('click', addToWallet);
document.querySelector('.remove-btn').addEventListener('click', removeFromWallet);
