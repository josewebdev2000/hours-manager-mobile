const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const { generateUniqueRandomPin, isFirstDateAfterSecondDate } = require("../helpers/funcs");

const PasswordResetToken = sequelize.define("PasswordResetToken", {
    passwordResetTokenId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "PasswordResetTokenID",
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Token",
        unique: "token_unique"
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "ExpiryDate"
    },
    createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "CreatedAt",
        defaultValue: DataTypes.NOW,
        immutable: true
    }
},
{
    tableName: "PasswordResetToken",
    timestamps: false
});

// Get All PasswordResetTokens
PasswordResetToken.getAll = async () => await PasswordResetToken.findAll();

// Grab a password reset token by the token
PasswordResetToken.getPasswordResetTokenByToken = async(token) => await PasswordResetToken.findOne({ where: {token: token }});

// Generate new Password Reset Token
PasswordResetToken.createNewToken = async (springUserId) => {
    return await PasswordResetToken.create({
        token: generateUniqueRandomPin(),
        expiryDate: new Date(Date.now() + 15 * 60 * 1000), // Expire after 15 minutes,
        createdAt: new Date(),
        springUserId: springUserId
    });
};

// Validate a password reset token
PasswordResetToken.validateToken = async(passwordResetToken) => {
    
    // Grab today's date
    const today = new Date();

    // Return true if passwordResetToken exists and if the expiry date comes after today's
    return passwordResetToken && isFirstDateAfterSecondDate(passwordResetToken.expiryDate, today);
};

// Delete All PasswordResetTokens of a given SpringUserId
PasswordResetToken.deleteAllBySpringId = async(id) => await PasswordResetToken.destroy({ where: { springUserId: id } });

module.exports = PasswordResetToken;