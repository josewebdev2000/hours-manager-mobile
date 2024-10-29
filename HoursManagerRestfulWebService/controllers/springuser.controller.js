// Controller for the SpringUser Model
require("dotenv").config();
const { SpringUser } = require("../models/index.model");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const HTTPCodes = require("../helpers/http_codes");
const { registerView, loginView, logoutView } = require("../views/springuser.view");

// Import Exceptions
const { UserAlreadyExistsError, UserNotFoundError, ValidationError } = require("../errors/index.error");

// Import Validators
const { NameValidator, EmailValidator, PasswordValidator, UrlValidator } = require("../validators/index.validator");

// Grab the JWT Secret
const { JWT_SECRET, JWT_EXPIRATION_PERIOD, JWT_COOKIE_EXPIRATION_PERIOD } = process.env;

// Register a new user
exports.register = async (req, res) => {

    try
    {
        // Grab JSON data from the front-end
        const { name, email, password } = req.body;

        // If name does not pass regex, throw ValidationError
        if (!NameValidator.isValidName(name))
        {
            throw new ValidationError("Only letters and whitespace characters allowed");
        }

        // If email does not pass regex, throw ValidationError
        if (!EmailValidator.isValidEmail(email))
        {
            throw new ValidationError(`"${email}" is invalid`);
        }

        // If password does not pass regex, throw ValidationError
        if (!PasswordValidator.isValidPassword(password))
        {
            throw new ValidationError("Password needs at least 8 characters, no whitespace, at least one uppercase letter, one lowercase letter, and no symbols");
        }

        // Check if a user already exists with the same email
        const springUserInDbData = await SpringUser.getSpringUserByEmail(email);

        // If a user was found, throw an UserAlreadyExistsError
        if (springUserInDbData)
        {
            throw new UserAlreadyExistsError(`Email ${email} is already registered`);
        }

        // Hash the password
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

        // Create new user in the DB
        const newSpringUser = await SpringUser.register({
            springUserName: name,
            springUserEmail: email,
            springUserPassword: hashedPassword
        });

        // Create a JWT token to send
        const token = jwt.sign({
            id: newSpringUser.springUserId,
            name: newSpringUser.springUserName,
            email: newSpringUser.springUserEmail,
            pic: newSpringUser.springUserPicUrl
        }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRATION_PERIOD });

        // Save the token in a cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD
        });

        // Prepare proper response for registration
        const successRegisterRes = registerView({name, email, password, pic: null}, HTTPCodes.Ok, null);

        // Return JSON View about the new user
        return res.status(HTTPCodes.Ok).json(successRegisterRes);
    }

    catch (error)
    {
        // Catch which error was thrown
        if (error instanceof ValidationError || error instanceof UserAlreadyExistsError)
        {
            // Prepare error view for errors thrown by myself
            const errorRegisterRes = registerView(null, HTTPCodes.BadRequest, error.message);

            return res.status(HTTPCodes.BadRequest).json(errorRegisterRes);
        }

        else
        {
            // Prepare an error response
            const errorRegisterRes = registerView(null, HTTPCodes.InternalServerError, "Could not register user in the database");

            // Console error the error
            console.error(error);

            return res.status(HTTPCodes.InternalServerError).json(errorRegisterRes);
        }
    }
};

// Login an existing user
exports.login = async (req, res) => {

    try
    {
        // Grab data from the user
        const { email, password } = req.body;

        // Validate email and password
        if (!EmailValidator.isValidEmail(email))
        {
            throw new ValidationError(`Email: ${email} is invalid`);
        }

        if (!PasswordValidator.isValidPassword(password))
        {
            throw new ValidationError("Password needs at least 8 characters, no whitespace, at least one uppercase letter, one lowercase letter, and no symbols");
        }

        // Try to find a user by email
        const springUser = await SpringUser.getSpringUserByEmail(email);

        // If the SpringUser is not found, throw a UserNotFoundError
        if (!springUser)
        {
            throw new UserNotFoundError("Incorrect Credentials");
        }

        // Compare hashed password from the one given to the one in the DB
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

        // If the hasedPassword is not the same as the one in the DB, throw a validation error
        if (hashedPassword !== springUser.springUserPassword)
        {
            throw new ValidationError("Incorrect Credentials");
        }

        // Check if a token already exists rn
        const token = req.cookies.token;

        if (token)
        {
            // Create JWT Token
            // Try to check if a valid token already exists for this user
            try
            {
                jwt.verify(token, JWT_SECRET);
                const userAlreadyLoggedInErrorRes = loginView(null, HTTPCodes.BadRequest, "User is already logged in");
                return res.status(HTTPCodes.BadRequest).json(userAlreadyLoggedInErrorRes);
            }

            catch
            {
                const newToken = jwt.sign(
                     {
                        id: springUser.springUserId,
                        name: springUser.springUserName,
                        email: springUser.springUserEmail,
                        pic: springUser.springUserPicUrl
                     }, 
                    JWT_SECRET, 
                    { expiresIn: JWT_EXPIRATION_PERIOD});
                
                res.cookie("token", newToken, {
                    path: "/",
                    httpOnly: true,
                    maxAge: JWT_COOKIE_EXPIRATION_PERIOD  
                });
            }
        }

        // Create token in case there is none
        const newToken = jwt.sign(
            { 
                id: springUser.springUserId,
                name: springUser.springUserName,
                email: springUser.springUserEmail,
                pic: springUser.springUserPicUrl
            }, 
            JWT_SECRET, 
            { expiresIn: JWT_EXPIRATION_PERIOD});
        
        res.cookie("token", newToken, {
            path: "/",
            httpOnly: true,
            maxAge: JWT_COOKIE_EXPIRATION_PERIOD  
        });

        // Prepare proper response for login view
        const successLoginRes = loginView(
            {
                id: springUser.springUserId, 
                name: springUser.springUserName, 
                email: springUser.springUserEmail, 
                pic: springUser.springUserPicUrl 
            }, HTTPCodes.Ok, null);
        
        // Return the response
        return res.status(HTTPCodes.Ok).json(successLoginRes);
    }

    catch (error)
    {
        if (error instanceof ValidationError || error instanceof UserNotFoundError)
        {
            const errorLoginRes = loginView(null, HTTPCodes.BadRequest, error.message);
            return res.status(HTTPCodes.BadRequest).json(errorLoginRes);
        }

        else
        {
            const errorLoginRes = loginView(null, HTTPCodes.InternalServerError, "Could not log in user due to a database error");
            return res.status(HTTPCodes.InternalServerError).json(errorLoginRes);
        }
    }
};

exports.logout = async(req, res) => {

    // Check the token cookie is set from client-side
    const token = req.cookies.token;

    // If the token is not set up, the user is not authenticated
    if (!token)
    {
        const unauthenticatedUserRes = logoutView(null, HTTPCodes.Unauthorized, "You are not authenticated");
        return res.status(HTTPCodes.Unauthorized).json(unauthenticatedUserRes);
    }

    // If there is an error, return early error response
    res.clearCookie("token");

    // Clear the authentication token cookie and send success message
    const successfulLogoutRes = logoutView({message: "You logged out successfully" }, HTTPCodes.Ok, null);
    return res.status(HTTPCodes.Ok).json(successfulLogoutRes);
};