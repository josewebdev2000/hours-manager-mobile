/** Main Script for the Whole Back-End Server */

// Import dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const { associateModels } = require("./models/index.model");
require("./models/index.model");

// Import Routers
const { SpringUserRouter } = require("./routes/index.route");
const { PasswordResetTokenRouter } = require("./routes/index.route");
// Grab Port to run app
const PORT = process.env.PORT;

// Create Express App
const app = express();

// Allow CORS
app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true
}));

// Whitelist CORS ONLY FOR THE FRONT-END

// Let read URL parameters from requests
app.use(express.urlencoded({ extended: false }));

// Set up JSON usage
app.use(express.json());

// Allow Cookie Parsing
app.use(cookieParser());

// Associate models
associateModels();

// Sync the Sequelize models with the MySQL DB
(async () => {
    try
    {
        await sequelize.sync({ force: false, alter: false });
        console.log("Database synced successfully");
    }
    catch (err)
    {
        console.error("Error syncing database:", err);
    }
})();

// Incorporate Routes in Express App
app.use("/user", SpringUserRouter);
app.use("/token", PasswordResetTokenRouter);

// Run the Express App
app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
});