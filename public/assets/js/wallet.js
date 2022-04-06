// var strs = ["String 1", "String 2", "String 3"];
// var list = document.createElement("ul");
// for (var i in strs) {
//   var anchor = document.createElement("a");
//   anchor.href = "#";
//   anchor.innerText = strs[i];

//   var elem = document.createElement("li");
//   elem.appendChild(anchor);
//   list.appendChild(elem);
// }

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
  
  //TODO get user id from session
  //console.log("logged in user id is: " + req.session.userId)
  
  //get all wallet data
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

const getAcronymFromMenuText = function(menuText) {
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
  const count = parseInt(document.querySelector('.amount-input').value)

  //get the id for the coin
  let CoinId = await getCoinIdByAcronym(coinAcronym)

  //get walletId of logged in user
  let WalletId = await getWalletId(); 

  console.log("Inserting into wallet Id: " + WalletId + " a coin Id of: " + CoinId + " with a count of: " + count)

  //add coins to wallet using API
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
    console.log("Added to wallet")
  } else {
    console.log("Error adding to wallet: " + response.statusText);
  }
}

async function removeFromWallet() {
  console.log("remove button clicked")

}

dropdown.addEventListener("click", toggleDropdown);
document.querySelector('.add-btn').addEventListener('click', addToWallet);
document.querySelector('.remove-btn').addEventListener('click', removeFromWallet);