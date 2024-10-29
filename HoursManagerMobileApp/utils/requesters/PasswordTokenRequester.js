/** 
 * Contains async/await code to deal with the API
 * that will be repeated more than once throughout
 * the mobile app  */

import { apiClient, backendApiRoutes } from "../../config/backend.config";

export async function isPasswordResetTokenValidApiRequest(token)
{
    /** Return the response from the server */
    try
    {
        // Prepare payload to send to the back-end API
        const isPasswordResetTokenValidPayload = {
            token: token
        };

        // Send Axios POST Request
        const response = await apiClient.post(backendApiRoutes.passwordResetTokenRoutes.checkTokenValidState, isPasswordResetTokenValidPayload);

        // Grab data from response
        const { data } = response;

        // Let the callback handle the data
        return data;
    }

    catch (error)
    {
        throw error;
    }
}