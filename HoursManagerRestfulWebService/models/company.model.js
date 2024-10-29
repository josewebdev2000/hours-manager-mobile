const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Company = sequelize.define("Company", {
    companyId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "CompanyID",
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "CompanyName"
    },
    companyContactEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "CompanyContactEmail",
        validate: {
            isEmail: {
                msg: "Please enter a valid email"
            }
        }
    },
    companyContactPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "CompanyContactPhoneNumber"
    }
},
{
    tableName: "Company",
    timestamps: false
});


// Static methods to deal with the DB

// CODE THIS PART LATER ON
// CODE THIS PART LATER ON
// CODE THIS PART LATER ON
// CODE THIS PART LATER ON

module.exports = Company;