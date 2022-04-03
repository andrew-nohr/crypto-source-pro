'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Coin', [
      {
        acronym: 'BTC',
        name: 'bitcoin'
      },
      {
        acronym: 'ETH',
        name: 'ethereum'
      },
      {
        acronym: 'ADA',
        name: 'cardano'
      },
      {
        acronym: 'DOGE',
        name: 'dogecoin'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Coin', {}, null);
  }
};
