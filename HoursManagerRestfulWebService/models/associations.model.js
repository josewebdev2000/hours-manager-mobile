/** File meant to associate models */
// Require models
const SpringUser = require("./springuser.model");
const Company = require("./company.model");
const Job = require("./job.model");
const PasswordResetToken = require("./passwordresettoken.model");
const PayRate = require("./payrate.model");
const PayCheck = require("./paycheck.model");
const WorkingDay = require("./workingday.model");
const WorkSession = require("./worksession.model");

// Import Errors
const { UserNotFoundError, DatabaseError } = require("../errors/index.error");

function associateModels()
{
    // Associate Spring User with Company
    SpringUser.hasMany(Company, {
        foreignKey: "companyUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserCompanies"
    });

    // Associate Spring User with Job
    SpringUser.hasMany(Job, {
        foreignKey: "jobUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserJobs"
    });

    // Associate Spring User with PasswordResetToken
    SpringUser.hasMany(PasswordResetToken, {
        foreignKey: "springUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserPasswordResetTokens"
    });

    // Associate SpringUser with PayRate
    SpringUser.hasMany(PayRate, {
        foreignKey: "payRateUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserPayRates"
    });

    // Associate SpringUser with PayCheck
    SpringUser.hasMany(PayCheck, {
        foreignKey: "payCheckUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserPayChecks"
    });

    // Associate SpringUser with WorkingDay
    SpringUser.hasMany(WorkingDay, {
        foreignKey: "workingDayUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserWorkingDays"
    });

    // Associate SpringUser with WorkSession
    SpringUser.hasMany(WorkSession, {
        foreignKey: "workSessionUserId",
        sourceKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserWorkSessions"
    });

    // Associate Password Reset Token with Spring User
    PasswordResetToken.belongsTo(SpringUser, {
        foreignKey: {
            name: "springUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "passwordTokenUser"
    });

    // Associate Company with Job
    Company.hasMany(Job, {
        foreignKey: "jobCompanyId",
        sourceKey: "companyId",
        onDelete: "CASCADE",
        as: "companyJobs"
    });

    // Associate Company with Spring User
    Company.belongsTo(SpringUser, {
        foreignKey: {
            name: "companyUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "companyUser"
    });

    // Associate Job with PayRate
    Job.hasMany(PayRate, {
        foreignKey: "payRateJobId",
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "jobPayRates"
    });

    // Associate Job with PayCheck
    Job.hasMany(PayCheck, {
        foreignKey: "payCheckJobId",
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "jobPayChecks"
    });

    // Associate Job with WorkingDay
    Job.hasMany(WorkingDay, {
        foreignKey: "workingDayJobId",
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "jobWorkingDays"
    });

    // Associate Job with WorkSession
    Job.hasMany(WorkSession, {
        foreignKey: "workSessionJobId",
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "jobWorkSessions"
    });

    // Associate Job with Spring User
    Job.belongsTo(SpringUser, {
        foreignKey: {
            name: "jobUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "jobUser"
    });

    // Associate Job with Company
    Job.belongsTo(Company, {
        foreignKey: {
            name: "jobCompanyId",
            allowNull: false
        },
        targetKey: "companyId",
        onDelete: "CASCADE",
        as: "jobCompany"
    });

    // Associate PayRate with SpringUser
    PayRate.belongsTo(SpringUser, {
        foreignKey: {
            name: "payRateUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "payRateUser"
    });

    // Associate PayRate with Job
    PayRate.belongsTo(Job, {
        foreignKey: {
            name: "payRateJobId",
            allowNull: false
        },
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "payRateJob"
    });

    // Associate PayCheck with SpringUser
    PayCheck.belongsTo(SpringUser, {
        foreignKey: {
            name: "payCheckUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "payCheckUser"
    });

    // Associate PayCheck with Job
    PayCheck.belongsTo(Job, {
        foreignKey: {
            name: "payCheckJobId",
            allowNull: false
        },
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "payCheckJob"
    });

    // Associate WorkingDay with SpringUser
    WorkingDay.belongsTo(SpringUser, {
        foreignKey: {
            name: "workingDayUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "workingDayUser"
    });

    // Associate WorkingDay with Job
    WorkingDay.belongsTo(Job, {
        foreignKey: {
            name: "workingDayJobId",
            allowNull: false
        },
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "workingDayJob"
    });

    // Associate WorkSession with SpringUser
    WorkSession.belongsTo(SpringUser, {
        foreignKey: {
            name: "workSessionUserId",
            allowNull: false
        },
        targetKey: "springUserId",
        onDelete: "CASCADE",
        as: "springUserWorkSession"
    });

    // Associate WorkSession with Job
    WorkSession.belongsTo(Job, {
        foreignKey: {
            name: "workSessionJobId",
            allowNull: false
        },
        targetKey: "jobId",
        onDelete: "CASCADE",
        as: "jobWorkSession"
    });
}

// Return password tokens of a Spring User
async function getTokensOfUser(springUser)
{
    // Find the user by email first
    try
    {
        return await springUser.getSpringUserPasswordResetTokens();
    }

    catch (error)
    {
        console.error(error);
        throw new UserNotFoundError("User could not be found");
    }
}

// Get user associated to a certain token entity
async function getSpringUserFromPasswordToken(passwordTokenEntity)
{
    try
    {
        // Grab the springUserId from the Password Token Entity
        const springUserId = passwordTokenEntity.springUserId;

        if (!springUserId)
        {
            throw new DatabaseError("Could not get data about the owner of this token");
        }

        // Return user with that springUserId
        const springUser = SpringUser.getSpringUserById(springUserId);

        if (!springUser)
        {
            throw new UserNotFoundError("Could not the get owner of this token");
        }

        return springUser;
    }

    catch (error)
    {
        if (!error instanceof UserNotFoundError && !error instanceof DatabaseError)
        {
            console.log(error);
        }

        throw error;
    }
}

// Delete all existing passwordresettokens from a user
async function deleteAllPasswordResetTokensOfUser(springUser)
{
    try
    {
        // If it could not be found, then throw an error
        if (!springUser)
        {
            throw new UserNotFoundError("User could not be found");
        }

        // Delete all password reset tokens associated to the given user
        await PasswordResetToken.deleteAllBySpringId(springUser.springUserId);
    }

    catch (error)
    {
        if (error instanceof UserNotFoundError)
        {
            throw error;
        }

        else
        {
            console.log(error);
            throw new DatabaseError("Could not delete password tokens of user because of a database error");
        }
    }
}

module.exports = {
    associateModels,
    getTokensOfUser,
    getSpringUserFromPasswordToken,
    deleteAllPasswordResetTokensOfUser
};