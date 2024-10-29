// Throw when wanted to send an email but it failed
class EmailSendingError extends Error
{
    constructor(msg)
    {
        super(msg);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = EmailSendingError;