const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

async function hashPassword(user,option) {
    if(user.password) {
        user.password = await bcrypt.hash(user.password,10)
    }
    return user
}

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        f_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        l_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
      }
);

User.beforeBulkCreate((async (users) => Promise.all(users.map(i => hashPassword(i)))))
User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)

module.exports = User;