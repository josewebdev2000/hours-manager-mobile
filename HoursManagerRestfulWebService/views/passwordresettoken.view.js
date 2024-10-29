// JSON payloads fro PasswordResetToken Model

// Import Http Codes
const HTTPCodes = require("../helpers/http_codes");

exports.requestTokenView = (data, http_code, error_msg) => {
    // If the http_code is not Success, return error message
    if (http_code !== HTTPCodes.Ok)
    {
        return {
            error: error_msg
        };
    }

    // Return the data
    return data;
};

exports.checkTokenValidStateView = (isValid, http_code, error_msg) => {
    // If the http_code is Internal Server Error
    if (http_code !== HTTPCodes.Ok)
    {
        return {
            error: error_msg
        };
    }

    // Form success payload
    const tokenValidPayload = {
        isValid: isValid,
        message: `The given token is ${isValid ? 'valid' : 'invalid or has expired'}`
    };

    // Return the payload
    return tokenValidPayload;
};

exports.resetUserPasswordView = (data, http_code, error_msg) => {

        // If the http_code is not Success, return error message
        if (http_code !== HTTPCodes.Ok)
        {
            return {
                error: error_msg
            };
        }
        
        // Return the data
        return data;
};