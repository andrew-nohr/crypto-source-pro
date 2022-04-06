// const fetch = require('node-fetch');

// const getCoinLayerDataBySymbol = function (symbol) {
//     var coinLayerApiKey = "adf0c97a6bc7712feea1fc05da4edb58"
//     var coinLayerURL =
//         "http://api.coinlayer.com/api/live?access_key=" +
//         coinLayerApiKey +
//         "&Symbols=" +
//         symbol

//     console.log("Fetching: " + coinLayerURL)
//     fetch(coinLayerURL)
//         // Check if response is OK and if it is, load response as json
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 return Promise.reject("API did not return an OK response.")
//             }
//         })

//         // check if we recieved data back and if we did, display it to user
//         .then((coinLayerData) => {
//             if (coinLayerData != "" && coinLayerData != null) {
//                 return coinLayerData
//             }
//         })

//         // if we encounter errors above, this catch block will run
//         .catch(function (error) {
//             console.log(error)
//         })
// }



// module.exports = getCoinLayerDataBySymbol;
