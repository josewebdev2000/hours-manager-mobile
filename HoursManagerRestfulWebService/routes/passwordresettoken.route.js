// Handle all routes related to the PasswordResetToken

// Import Dependencies
const express = require("express");

// Import Controller for PasswordResetToken
const PasswordResetTokenController = require("../controllers/passwordresettoken.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /token

// Try out POST http://localhost:PORT/token/requestToken
router.post("/requestToken", PasswordResetTokenController.requestToken);

// Try out POST http://localhost:PORT/token/checkTokenValidState
router.post("/checkTokenValidState", PasswordResetTokenController.checkTokenValidState);

// Try out POST http://localhost:PORT/token/resetUserPassword
router.post("/resetUserPassword", PasswordResetTokenController.resetUserPassword);

module.exports = router;