const { User } = require('../models');

const userSeed = [
  {
    "f_name": "Jason",
    "l_name": "Walters",
    "email": "Jason@gmail.com",
    "password": "password12345"
  },
  {
    "f_name": "Lisa",
    "l_name": "Jennings",
    "email": "Lisa@gmail.com",
    "password": "password12345"
  },
  {
    "f_name": "Daniel",
    "l_name": "Hixson",
    "email": "Daniel@gmail.com",
    "password": "password12345"
  },
  {
    "f_name": "Karen",
    "l_name": "Downey",
    "email": "Karen@gmail.com",
    "password": "password12345"
  },
  {
    "f_name": "Eugene",
    "l_name": "Ahn",
    "email": "Eugene@gmail.com",
    "password": "password12345"
  },
  {
    "f_name": "Austin",
    "l_name": "Vazquez",
    "email": "Austin@gmail.com",
    "password": "password12345"
  }
];

const userInfo = () => User.bulkCreate(userSeed);

module.exports = userInfo;