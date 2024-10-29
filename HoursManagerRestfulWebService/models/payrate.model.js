const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PayRate = sequelize.define("PayRate", {
    payRateId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        field: "PayRateID",
        allowNull: false,
        autoIncrement: true
    },
    payRateType: {
        type: DataTypes.ENUM("hourly", "daily", "weekly", "biweekly", "monthly"),
        allowNull: false,
        field: "PayRateType"
    },
    payRateAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "PayRateAmount"
    }
},
{
    tableName: "PayRate",
    timestamps: false
});

module.exports = PayRate;