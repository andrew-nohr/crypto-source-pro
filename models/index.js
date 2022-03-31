const User = require("./User");
const Wallet = require("./Wallet");
const Coin = require("./Coin")

User.hasMany(Wallet);

Wallet.belongsTo(User);

Wallet.hasMany(Coin);

module.exports = { User, Wallet };