const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define("Job", {
    jobId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "JobID",
        allowNull: false
    },
    jobName: {
        type: DataTypes.STRING,
        field: "JobName",
        allowNull: false
    },
    jobDescription: {
        type: DataTypes.STRING,
        field: "JobDescription",
        allowNull: false
    }
}, 
{
    tableName: "Job",
    timestamps: false

});

module.exports = Job;