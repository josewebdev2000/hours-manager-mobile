/**
 * 
 * Establish A Database Connection Here
 */
const { Sequelize } = require("sequelize");

require("dotenv").config();

// Import environment variables
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_DIALECT } = process.env;

// Start out sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

console.log(sequelize);

module.exports = sequelize;