const userInfo = require('./userData');
const blogInfo = require('./blogData');
const commentInfo = require('./commentData');

require('dotenv').config();
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await userInfo();
  await blogInfo();
  await commentInfo();

  process.exit(0);
};

seedAll();