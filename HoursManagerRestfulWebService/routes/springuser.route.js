// Handle all routes related to the SpringUser

// Import Dependencies
const express = require("express");
const SpringUserController = require("../controllers/springuser.controller");

// Create a router instance
const router = express.Router();

// Configure HTTP Routes for /user
// Try out POST http://localhost:PORT/user/register
router.post("/register", SpringUserController.register);

// Try out POST http://localhost:PORT/user/login
router.post("/login", SpringUserController.login);

// Try out POST http://localhost:PORT/user/logout
router.post("/logout", SpringUserController.logout);

module.exports = router;