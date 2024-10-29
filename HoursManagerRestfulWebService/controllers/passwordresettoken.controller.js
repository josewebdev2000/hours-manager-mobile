// Controller for PasswordResetToken Model
const { PasswordResetToken, SpringUser } = require("../models/index.model");
const { deleteAllPasswordResetTokensOfUser, getSpringUserFromPasswordToken } = require("../models/associations.model");

// Import HTTP Codes
const HTTPCodes = require("../helpers/http_codes");

// Import Views
const { requestTokenView, checkTokenValidStateView, resetUserPasswordView } = require("../views/passwordresettoken.view");

// Import Exceptions
const { ValidationError, UserNotFoundError, PasswordResetTokenNotFoundError, EmailTemplateLoadError, EmailSendingError, DatabaseError } = require("../errors/index.error");

// Import Validators
const { EmailValidator, PinValidator, PasswordValidator } = require("../validators/index.validator");

// Import Token Email Template Loader and Sender
const { getTodaysDate } =  require("../helpers/funcs");

// Import Email handler
const { EmailHandler } = require("../services/EmailHandler.services");

// Import Hasher
const crypto = require("crypto");

// Handle request for a new token
exports.requestToken = async (req, res) => {

    try
    {
        // Grab JSON data from the front-end
        const { email } = req.body;

        // If email does not pass regex, throw ValidationError
        if (!EmailValidator.isValidEmail(email))
        {
            throw new ValidationError(`"${email}" is invalid`);
        }

        // Grab Spring User associated to the email
        const springUser = await SpringUser.getSpringUserByEmail(email);

        // If not found, throw error
        if (!springUser)
        {
            throw new UserNotFoundError("User could not be found");
        }

        // Delete all existing password reset tokens of the user
        await deleteAllPasswordResetTokensOfUser(springUser);

        // Generate a new password reset token
        const newPasswordResetToken = await PasswordResetToken.createNewToken(springUser.springUserId);

        // Prepare the email to send to the user and then send it
        const emailHandler = new EmailHandler(
            springUser.springUserEmail,
            "Password Reset Token Delivery",
            "emailToken.html",
            {
                "{{NAME}}": springUser.springUserName,
                "{{PIN}}":  newPasswordResetToken.token,
                "{{DATE}}": getTodaysDate()
            }
        );

        // Prepare email request to send email to microservice
        emailHandler.sendEmail();

        // Send a success view about password reset token
        const successRes = requestTokenView({message: "The password reset pin was sent to your email"}, HTTPCodes.Ok, null);
        return res.status(HTTPCodes.Ok).json(successRes);
    }

    catch (error)
    {
        // 400 errors
        if (error instanceof ValidationError || error instanceof UserNotFoundError || error instanceof EmailTemplateLoadError || error instanceof EmailSendingError)
        {
            const clientErrorRes = requestTokenView(null, HTTPCodes.BadRequest, error.message);
            return res.status(HTTPCodes.BadRequest).json(clientErrorRes);
        }

        // 500 errors
        else if (error instanceof DatabaseError)
        {
            console.log(error);
            const internalServerErrorRes = requestTokenView(null, HTTPCodes.InternalServerError, error.message);
            return res.status(HTTPCodes.InternalServerError).json(internalServerErrorRes);
        }

        else
        {
            console.log(error);
            const internalServerErrorRes = requestTokenView(null, HTTPCodes.InternalServerError, "Error generating password reset pin");
            return res.status(HTTPCodes.InternalServerError).json(internalServerErrorRes);
        }
    }
};

// Return whether the given token is valid or not
exports.checkTokenValidState = async (req, res) => {

    try
    {
        // Grab PIN from the request body
        const { token } = req.body;

        // If PIN is not of valid format, raise ValidationError
        if (!PinValidator.isValidPin(token))
        {
            throw new ValidationError("Token is of invalid format");
        }

        // Grab token entity from the DB
        const passwordResetTokenEntity = await PasswordResetToken.getPasswordResetTokenByToken(token);

        // Confirm its validity
        const passwordTokenValid = await PasswordResetToken.validateToken(passwordResetTokenEntity);

        // Return valid status of the token
        const passwordTokenValidRes = checkTokenValidStateView(
            passwordTokenValid, 
            HTTPCodes.Ok,
            null
         );

         // Send the response to the user
         return res.status(passwordTokenValid ? HTTPCodes.Ok : HTTPCodes.BadRequest).json(passwordTokenValidRes);
    }

    catch (error)
    {
        if (error instanceof ValidationError)
        {
            // Prepare error response for view
            const responseError = checkTokenValidStateView(null, HTTPCodes.BadRequest, error.message);
            return res.status(HTTPCodes.BadRequest).json(responseError);
        }

        else
        {
            // Send a generic 500 error response
            console.log(error);
            const responseInternalErrorView = checkTokenValidStateView(null, HTTPCodes.InternalServerError, "Could not check validity of token because of an internal server error");
            return res.status(HTTPCodes.InternalServerError).json(responseInternalErrorView);
        }
    }
};

// Reset the user's password
exports.resetUserPassword = async (req, res) => {

    // Grab the token and the new password from the front-end
    try
    {
        const { token, password } = req.body;

        // Validate token format
        if (!PinValidator.isValidPin(token))
        {
            throw new ValidationError("Token is of invalid format");
        }
    
        // Validate password format
        if (!PasswordValidator.isValidPassword(password))
        {
            throw new ValidationError("New password is of invalid format");
        }
    
        // Check the password has not yet expired
        const passwordResetTokenEntity = await PasswordResetToken.getPasswordResetTokenByToken(token);
    
        // If no entity is given, throw a not found error
        if (!passwordResetTokenEntity)
        {
            throw new PasswordResetTokenNotFoundError("The given token is not present in the system");
        }
    
        // Confirm it has not expired yet
        const isPasswordTokenStillValid = await PasswordResetToken.validateToken(passwordResetTokenEntity);
    
        // If expired, return the token has already expired
        if (!isPasswordTokenStillValid)
        {
            const expiredPasswordTokenRes = resetUserPasswordView(null, HTTPCodes.BadRequest, "The given token has already expired");
            return res.status(HTTPCodes.BadRequest).json(expiredPasswordTokenRes);
        }

        // Grab the SpringUser associated to the password
        const springUser = await getSpringUserFromPasswordToken(passwordResetTokenEntity);

        if (!springUser)
        {
            throw new UserNotFoundError("The owner of this token could not be found");
        }

        // Update the user's password
        // First hash the new password
        const newPasswordHash = crypto.createHash("sha256").update(password).digest("hex");
        springUser.springUserPassword = newPasswordHash;
        await springUser.save();

        // Return the password has successfully been resetted
        const passwordResetSuccessRes = resetUserPasswordView({
            message: "Your password has been successfully updated"
        },HTTPCodes.Ok, null);

        return res.status(HTTPCodes.Ok).json(passwordResetSuccessRes);
    }

    catch (error)
    {
        if (error instanceof ValidationError || error instanceof PasswordResetTokenNotFoundError || error instanceof UserNotFoundError)
        {
            const clientErrorRes = resetUserPasswordView(null, HTTPCodes.BadRequest, error.message);
            return res.status(HTTPCodes.BadRequest).json(clientErrorRes);
        }

        else
        {
            console.log(error);
            const internalServerErrorRes = resetUserPasswordView(null, HTTPCodes.InternalServerError, "Could not update user's password because of an internal server error");
            return res.status(HTTPCodes.InternalServerError).json(internalServerErrorRes);
        }
    }
};
