// Throw when the same user tries to log in when he/she's already logged in
class UserAlreadyLoggedInError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserAlreadyLoggedInError;