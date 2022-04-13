const userSeed = require('./userSeeds');
const postSeed = require('./postSeeds');
const commentSeed = require('./commentSeeds');

require('dotenv').config();
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await userSeed();
  await postSeed();
  await commentSeed();

  process.exit(0);
};

seedAll();