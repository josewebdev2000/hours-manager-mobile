const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WorkSession = sequelize.define("WorkSession", {
    workSessionId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "WorkSessionID"
    },
    workSessionStartTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "WorkSessionStartTime"
    },
    workSessionEndTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "WorkSessionEndTime"
    },
    workSessionDuration: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "WorkSessionDuration"
    }
},
{
    tableName: "workSession",
    timestamps: false
});

module.exports = WorkSession;