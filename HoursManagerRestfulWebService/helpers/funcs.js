/** Common Functions to be used throughout the whole backend */
const jwt = require("jsonwebtoken");

function isValidIdFormat(id)
{
    // Return true if a positive whole number was provided
    return Number.isInteger(id) && id > 0;
}

function generateUniqueRandomPin()
{
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    // Declare PIN code
    const pin = Math.floor(Math.random() * (max - min + 1)) + min;;

    // Return the new pin
    return pin.toString();
}

function getTodaysDate()
{
    const today = new Date();

    // Format the date in format Month, Day Number, Year
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return today.toLocaleDateString("en-US", options);
}

function isFirstDateAfterSecondDate(firstDate, secondDate)
{
    // Return true if first date comes after the second
    // Grab time of both firstDate and secondDate
    const firstDateTime = firstDate.getTime();
    const secondDateTime = secondDate.getTime();

    return firstDateTime > secondDateTime;
}

function verifyJwt(token, secret)
{
    // Check if a JWT is valid or invalid
    try
    {
        jwt.verify(token, secret);

        return {
            message: "JWT Token is valid"
        };
    }

    catch
    {
        return {
            error: "JWT Token is invalid"
        };
    }
}

module.exports = {
    isValidIdFormat,
    verifyJwt,
    getTodaysDate,
    isFirstDateAfterSecondDate,
    generateUniqueRandomPin
};