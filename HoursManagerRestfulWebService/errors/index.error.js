// Export All Errors
const UserAlreadyExistsError = require("./UserAlreadyExistsError.error");
const UserAlreadyLoggedInError = require("./UserAlreadyLoggedInError.error");
const UserNotFoundError = require("./UserNotFoundError.error");
const ValidationError = require("./ValidationError.error");
const DatabaseError = require("./DatabaseError.error");
const EmailTemplateLoadError = require("./EmailTemplateLoadError.error");
const EmailSendingError = require("./EmailSendingError.error");
const PasswordResetTokenNotFoundError = require('./PasswordResetTokenNotFound.error');

module.exports = {
    UserAlreadyExistsError,
    UserAlreadyLoggedInError,
    UserNotFoundError,
    ValidationError,
    DatabaseError,
    EmailTemplateLoadError,
    PasswordResetTokenNotFoundError,
    EmailSendingError
};