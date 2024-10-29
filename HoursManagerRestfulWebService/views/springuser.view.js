// JSON payloads for SpringUser
// Import HttpCodes
const HTTPCodes = require("../helpers/http_codes");

exports.registerView = (data, http_code, error_msg) => {
    // If the http_code is not Success, return error message
    if (http_code !== HTTPCodes.Ok)
    {
        return {
            error: error_msg
        };
    }

    // Grab id, username, email, and pic from data
    const { id, name, email, pic } = data;

    // Return an object with those keys;
    return {
        id,
        name,
        email,
        pic
    };
};

exports.loginView = (data, http_code, error_msg) => {
    // If the http_code is not Success, return error message
    if (http_code !== HTTPCodes.Ok)
    {
        return {
            error: error_msg
        };
    }

    // Grab id, username, email, and pic from data
    const { id, name, email, pic } = data;

    // Return an object with those keys
    return {
        id,
        name,
        email,
        pic
    };
};

exports.logoutView = (data, http_code, error_msg) => {
    
    // If the http_code is not Ok. Return error message
    if (http_code !== HTTPCodes.Ok)
    {
        return {
            error: error_msg
        };
    }

    return data;
};