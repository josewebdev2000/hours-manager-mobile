// Export Validators
const BasicStrValidator= require("./basicstrvalidator.validator");
const EmailValidator = require("./emailvalidator.validator");
const NameValidator = require("./namevalidator.validator");
const PasswordValidator = require("./passwordvalidator.validator");
const UrlValidator = require("./urlvalidator.validator");
const PinValidator = require("./pinvalidator.validator");

module.exports = {
    BasicStrValidator,
    EmailValidator,
    NameValidator,
    PasswordValidator,
    PinValidator,
    UrlValidator
};