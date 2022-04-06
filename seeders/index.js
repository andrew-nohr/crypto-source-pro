const sequelize = require('../config/connection');
const seedCoin = require('./20220403004935-coin-seeder');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGallery();

  await seedPaintings();

  process.exit(0);
};

seedAll();