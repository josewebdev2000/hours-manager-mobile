const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WorkingDay = sequelize.define("WorkingDay", {
    workingDayId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "WorkingDayID"
    },
    workingDayName: {
        type: DataTypes.ENUM("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"),
        allowNull: false,
        field: "WorkingDayName"
    }
},
{
    tableName: "WorkingDay",
    timestamps: false
});

module.exports = WorkingDay;