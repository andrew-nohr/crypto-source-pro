const User = require("./User");
const Wallet = require("./Wallet");
const Coin = require("./Coin")

User.hasone(Wallet);

Wallet.belongsTo(User);

Wallet.hasMany(Coin);

Coin.hasMany(Wallet);

module.exports = { User, Wallet };