// Throw when the same user tries to register again
class UserAlreadyExistsError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserAlreadyExistsError;