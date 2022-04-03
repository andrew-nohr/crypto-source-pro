const User = require("./User");
const Wallet = require("./Wallet");
const Coin = require("./Coin");
const Coins_Wallet = require("./Coins_Wallet");

// User -> Wallet (user can have many wallets)
User.hasMany(Wallet, {
  foreignKey: "user_id",
});

// Wallet -> User (wallet belongs to one user)
Wallet.belongsTo(User, {
  foreignKey: "user_id",
});

// connects wallet and coins through join table
Wallet.belongsToMany(Coin, { 
    through: Coins_Wallet,
    as: 'owned_coins',
    foreignKey: 'WalletId'
});

// connects wallet and coins through join table
Coin.belongsToMany(Wallet, { 
  through: Coins_Wallet,
  as: 'coined_wallet',
  foreignKey: 'CoinId'
});

module.exports = { User, Wallet, Coin, Coins_Wallet };
