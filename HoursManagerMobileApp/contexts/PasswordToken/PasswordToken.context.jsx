/** Context for PasswordToken Data
 * 
 * To Handle Data Directly Related to Password Tokens to reset/change passwords
 * 
 */
import React, { createContext, useState, useEffect } from "react";

// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import Async Storage keys
import asyncStorageKeys from "../../config/asyncStorageKeys";

// Import Password Reset Check Validator Requester
import { isPasswordResetTokenValidApiRequest } from "../../utils/requesters/PasswordTokenRequester";

import PropTypes from "prop-types";

// Create the PasswordTokenContext
export const PasswordTokenContext = createContext();

export const PasswordTokenContextProvider = ({ children }) => {
    // Control Password Token Data from the Back-End
    const [ passwordToken, setPasswordToken ] = useState(null);

    // Know whether the password token has been requested or not
    const [ passwordTokenRequested, setPasswordTokenRequested ] = useState(false);

    // Know whether the password reset token the user entered is valid or not
    const [ isPasswordTokenValid, setIsPasswordTokenValid ] = useState(false);

    // Load values from async storage
    const loadPasswordTokenStatesFromAsyncStorage = async () => {
        // If the keys are set, set them as values
        const asyncStoragePasswordToken = await AsyncStorage.getItem(asyncStorageKeys.passwordResetToken);
        const asyncStoragePasswordTokenRequested = await AsyncStorage.getItem(asyncStorageKeys.passwordResetTokenRequested);

        // If the password token is in async storage
        if (asyncStoragePasswordToken)
        {
            // Check if it is valid
            try
            {
                const { isValid } = await isPasswordResetTokenValidApiRequest(asyncStoragePasswordToken);

                // If it is valid, then set password valid to true, the password token, and the passwordRequestedStatus to true
                setPasswordToken(asyncStoragePasswordToken);
                setIsPasswordTokenValid(isValid);
                setPasswordTokenRequested(isValid);
            }

            // If not, delete all keys from session storage that have to do with the password token
            catch (error)
            {
                await AsyncStorage.multiRemove([asyncStorageKeys.passwordResetToken, asyncStorageKeys.passwordResetTokenRequested, asyncStorageKeys.passwordResetTokenValid]);
            }

        }

        // If the password token request is set but the password token not, set it with its useState func
        if (JSON.parse(asyncStoragePasswordTokenRequested) && !asyncStoragePasswordToken)
        {
            setPasswordTokenRequested(asyncStoragePasswordTokenRequested);
        }
    };

    // Run when the app opens up
    useEffect(() => {
        loadPasswordTokenStatesFromAsyncStorage();
    }, []);

    return (
        <PasswordTokenContext.Provider value={{
            passwordToken,
            passwordTokenRequested,
            isPasswordTokenValid,
            setPasswordToken,
            setPasswordTokenRequested,
            setIsPasswordTokenValid
        }}>
            {children}
        </PasswordTokenContext.Provider>
    );
};

PasswordTokenContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};