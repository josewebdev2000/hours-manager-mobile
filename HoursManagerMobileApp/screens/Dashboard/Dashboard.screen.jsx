import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Toast } from "@ant-design/react-native";

// Import UserContext
import { UserContext } from "../../contexts/User/User.context";

// Import Back-End API Endpoints
import { apiClient, backendApiRoutes } from "../../config/backend.config";

// Import Async Storage functionality
import AsyncStorage from "@react-native-async-storage/async-storage";

import asyncStorageKeys from "../../config/asyncStorageKeys";

import PropTypes from "prop-types";

function Dashboard({ navigation })
{
    // Import function to setUser to null
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        
        try
        {
            // Delete the AsyncStorage key
            await AsyncStorage.multiRemove([asyncStorageKeys.jwtToken, asyncStorageKeys.jwtExpiryDate]);

            // Send request to logout
            await apiClient.post(backendApiRoutes.springUserRoutes.logout);
        }

        catch(error)
        {
            // Show error toast
            const errorMsg = error.response.data.error;

            Toast.fail(errorMsg);
        }

        finally
        {
            // Set the user to null either case
            setUser(null);
        }

    };

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Dashboard</Text>
            <Button 
                title="Log Out"
                onPress={handleLogout}
            />
        </View>
    );
}

export default Dashboard;

Dashboard.propTypes = {
    navigation: PropTypes.object.isRequired
};