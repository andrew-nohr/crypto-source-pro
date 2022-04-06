<<<<<<< HEAD
// var strs = ["String 1", "String 2", "String 3"];
// var list = document.createElement("ul");
// for (var i in strs) {
//   var anchor = document.createElement("a");
//   anchor.href = "#";
//   anchor.innerText = strs[i];
=======
var strs = ["String 1", "String 2", "String 3"];
var list = document.createElement("ul");

for (var i in strs) {
  var anchor = document.createElement("a");
  anchor.href = "#";
  anchor.innerText = strs[i];
>>>>>>> d89ff36a84c99fde9cf0d57be4badc2b90c28a79

//   var elem = document.createElement("li");
//   elem.appendChild(anchor);
//   list.appendChild(elem);
// }

var dropdown = document.querySelector(".dropdown");
var menuText = document.querySelector("#menuText");

var toggleDropdown = function (event) {
  event.stopPropagation();
  dropdown.classList.toggle("is-active");

  if (event.target.className == "dropdown-item") {
    var selectedCoin = event.target.textContent.trim(); //added trim to remove white space
    menuText.textContent = selectedCoin; //changes text in menuText class
  }
};

async function addToWallet() {
  console.log("add button clicked")

  const coin = menuText.textContent;
  const count = document.querySelector('.amount-input').value;

  console.log("Got asset type to add : " + coin + " with a count of: " + count)

  //get all coins data
  const coinsResponse = await fetch(`/api/coins`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (coinsResponse.ok) {
    let coinsArray = coinsResponse.json()
    console.log(coinsArray)
    //selectedCoinObject = coinsArray.find(object => object.acronym === 'BTC')
    //console.log("selected coin object: " + selectedCoinObject)
  } else {
    alert(response.statusText);
  }


  // //add coins to wallet using API
  // const response = await fetch(`/api/through`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     WalletId,
  //     CoinId,
  //     count
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });

  // if (response.ok) {
  //   console.log("added to wallet")
  // } else {
  //   alert(response.statusText);
  // }
}

async function removeFromWallet() {
  console.log("remove button clicked")

}

dropdown.addEventListener("click", toggleDropdown);
document.querySelector('.add-btn').addEventListener('click', addToWallet);
document.querySelector('.remove-btn').addEventListener('click', removeFromWallet);