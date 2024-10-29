// Throw when we try to fetch a Password Reset Token but we can't
class PasswordResetTokenNotFoundError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = PasswordResetTokenNotFoundError;