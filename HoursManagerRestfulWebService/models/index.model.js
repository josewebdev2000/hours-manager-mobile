// Prepare to export everything related to models
const { associateModels } = require("./associations.model");
const SpringUser = require("./springuser.model");
const PasswordResetToken = require("./passwordresettoken.model");
const Company = require("./company.model");
const Job = require("./job.model");
const PayRate = require("./payrate.model");
const PayCheck = require("./paycheck.model");
const WorkingDay = require("./workingday.model");
const WorkSession = require("./worksession.model");

// Export all models to the world
module.exports =  {
    associateModels,
    SpringUser,
    PasswordResetToken,
    Company,
    Job,
    PayRate,
    PayCheck,
    WorkingDay,
    WorkSession
};