/** JS Representation of the DB Entity 'SpringUser' */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Avatar = require("../config/avatars");

// SpringUser Model Schema
const SpringUser = sequelize.define("SpringUser", {
    springUserId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: 'SpringUserID',
        autoIncrement: true
    },
    springUserName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "SpringUserName"
    },
    springUserEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "SpringUserEmail",
        unique: true,
        validate: {
            isEmail: {
                msg: "Please enter a valid email"
            }
        }
    },
    springUserPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "SpringUserPassword"
    },
    springUserPicUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "SpringUserPicUrl",
        defaultValue: Avatar.USER,
        validate: {
            isUrl: {
                msg: "Please enter a valid URL"
            }
        }
    }
},
{
    tableName: "SpringUser",
    timestamps: false
});

// Static methods to deal with the DB

// Get Spring User By ID
SpringUser.getSpringUserById = async(id) => await SpringUser.findByPk(id);

// Get Spring User By Email
SpringUser.getSpringUserByEmail = async(email) => await SpringUser.findOne({ where: { springUserEmail: email }});

// Register a new user
SpringUser.register = async(springUserData) => await SpringUser.create(springUserData);

// Update the user by its id
SpringUser.updateSpringUserById = async(id, springUserData) => await SpringUser.update(springUserData, { where: { springUserId: id }});

// Delete the user by its id
SpringUser.deleteById = async(id) => SpringUser.destroy({ where: { springUserId: id }});

module.exports = SpringUser;