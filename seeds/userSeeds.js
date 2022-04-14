const { User } = require('../models');

const userSeed = [
  {
    "username": "JWalters",
    "email": "Jason@gmail.com",
    "password": "password12345"
  },
  {
    "username": "LJennings",
    "email": "Lisa@gmail.com",
    "password": "password12345"
  },
  {
    "username": "DHixson",
    "email": "Daniel@gmail.com",
    "password": "password12345"
  },
  {
    "username": "KDowney",
    "email": "Karen@gmail.com",
    "password": "password12345"
  },
  {
    "username": "EAhn",
    "email": "Eugene@gmail.com",
    "password": "password12345"
  },
  {
    "username": "AVazquez",
    "email": "Austin@gmail.com",
    "password": "password12345"
  }
];

const userInfo = () => User.bulkCreate(userSeed);

module.exports = userInfo;