/** Handle all email operations */

require("dotenv").config();

const path = require("path");
const fs = require("fs");
const axios = require("axios");

// Grab Email API Details
const { EmailTemplateLoadError, EmailSendingError } = require("../errors/index.error");

const { EMAIL_SENDING_API_ENDPOINT, EMAIL_SENDING_API_KEY } = process.env;

class EmailHandler
{
    constructor(to, subject, emailTemplateName, data)
    {
        this.emailTemplateName = emailTemplateName;
        this.emailTemplate = null;
        this.data = data;
        this.subject = subject;
        this.to = to;

        // Load the template
        this.loadHtmlTemplate();

        // Feed dynamic data to the emplate
        this.feedDynamicData();
    }

    loadHtmlTemplate()
    {
        // Grab the template path
        try
        {
            const templatePath = path.join(__dirname, "..", "templates", this.emailTemplateName);
            console.log(templatePath);
            this.emailTemplate = fs.readFileSync(templatePath, "utf-8");
        }

        catch (error)
        {
            throw new EmailTemplateLoadError("Could not load email template");
        }
    }

    feedDynamicData()
    {
        // Feed dynamic data to the template
        for (let key in this.data)
        {
            this.emailTemplate = this.emailTemplate.replace(key, this.data[key]);
        }
    }

    // Send the email template to the microservice
    async sendEmail()
    {
        try
        {
            // Prepare payload to send to the email microservice
            const emailDto = {
                apiKey: EMAIL_SENDING_API_KEY,
                toEmail: this.to,
                subject: this.subject,
                htmlContent: this.emailTemplate
            };

            // Send the request to send the email to the user
            await axios.post(EMAIL_SENDING_API_ENDPOINT, emailDto, {
                headers: {"Content-Type": "application/json"}
            });
        }

        catch (error)
        {
            console.log(error);
            throw new EmailSendingError("Could not send email");
        }
    }
}

module.exports = {
    EmailHandler
};