// Throw when data about a user that does not exist in the DB is tried to be handled
class UserNotFoundError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UserNotFoundError;