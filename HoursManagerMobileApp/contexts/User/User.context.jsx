/** Context for User Data 
 * 
 * To Handle Data that Directly Has To Do With The User
*/
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import AsyncStorage keys to use
import asyncStorageKeys from "../../config/asyncStorageKeys";

import JwtTokenDecoder from "../../utils/JwtTokenDecoder";

import { isFirstDateAfterSecondDate } from "../../utils/Comparers";

import PropTypes from "prop-types";

// Create the UserContext
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);

    // Check if there is an authToken already in AsyncStorage
    const checkStoredAuthToken = async () => {
        const token = await AsyncStorage.getItem(asyncStorageKeys.jwtToken);
        const expiryDate = await AsyncStorage.getItem(asyncStorageKeys.jwtExpiryDate);

        // Grab today's date
        const todaysDate = new Date();

        // Check if token is expired already
        const isTokenExpired = isFirstDateAfterSecondDate(todaysDate, new Date(expiryDate));

        // Delete all keys from AsyncStorage
        if (isTokenExpired)
        {
            await AsyncStorage.multiRemove([asyncStorageKeys.jwtToken, asyncStorageKeys.jwtExpiryDate]);
            return;
        }

        // If the token is found, decode it and set the user and the token has not expired yet
        if (token && !isTokenExpired)
        {
            const { id, name, email, pic } = JwtTokenDecoder.decodeJwt(token);

            // Set the user already
            setUser({
                id,
                name,
                email,
                pic
            });
        }
    };

    useEffect(() => {
        checkStoredAuthToken();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};