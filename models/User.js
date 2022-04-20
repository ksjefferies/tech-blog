const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const hashPassword = async (user, options) => {
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    }
    return user;
}
class User extends Model {
    checkPassword(password) {
        return bcrypt.compare(password, this.password)
    }

 }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
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


User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)

module.exports = User;