const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PayCheck = sequelize.define("PayCheck", {
    payCheckId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "PayCheckID"
    },
    payCheckPaymentDay: {
        type: DataTypes.ENUM("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"),
        allowNull: false,
        field: "PayCheckPaymentDay"
    },
    payCheckTotalPayment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "PayCheckTotalPayment"
    },
    payCheckTips: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        field: "PayCheckTips"
    }
},
{
    tableName: "PayCheck",
    timestamps: false
});

module.exports = PayCheck;