const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Wallet = require('./Wallet');
const Coin = require('./Coin');

class Coins_Wallet extends Model { }

Coins_Wallet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        WalletId: {
            type: DataTypes.INTEGER,
            references: {
                model: Wallet,
                key: 'id'
            }
        },
        CoinId: {
            type: DataTypes.INTEGER,
            references: {
                model: Coin,
                key: 'id'
            }
        },
        count: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'coins_wallet'
    }
);

module.exports = Coins_Wallet;