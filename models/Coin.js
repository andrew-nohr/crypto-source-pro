const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Coin extends Model { }

Coin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        acronym: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wallet_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'wallet',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'coin'
    }
);

module.exports = Coin;