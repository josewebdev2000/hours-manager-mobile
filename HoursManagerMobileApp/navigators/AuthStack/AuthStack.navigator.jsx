/**
 * 
 * Navigator for Screens Related to Authentication Like
 * Register Screen
 * Login Screen
 * Forgot Password Screen
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import Login from "../../screens/Login/Login.screen";
import Register from "../../screens/Register/Register.screen";
import ForgotPassword from "../../screens/ForgotPassword/ForgotPassword.screen";

const Stack = createNativeStackNavigator();

function AuthStack()
{
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
}

export default AuthStack;