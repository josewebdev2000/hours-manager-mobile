/**
 * 
 * App Navigator
 * Contains the Navigation Container for the whole app
 */
import React, { useContext } from "react";

// Import Navigation Dependencies
import { NavigationContainer } from "@react-navigation/native";

// Import navigators
import AuthStack from "../AuthStack/AuthStack.navigator";
import DashboardDrawer from "../DashboardDrawer/DashboardDrawer.navigator";

// Use the User Context Here
import { UserContext } from "../../contexts/User/User.context";

function AppNavigator()
{
    const { user } = useContext(UserContext);

    // If user is null, use the AuthStack, otherwise use the DashboardDrawer
    return (
        <NavigationContainer>
            { user === null ? <AuthStack /> : <DashboardDrawer /> }
        </NavigationContainer>
    );
}

export default AppNavigator;

