import React, { useState, useEffect, useContext } from "react";
import { Toast } from "@ant-design/react-native";

// Import App Theme Obj
import theme from "../../config/theme.config";

// Import Validators for Login Page
import EmailValidator from "../../validators/emailvalidator.validator";
import PasswordValidator from "../../validators/passwordvalidator.validator";

// Import User Context
import { UserContext } from "../../contexts/User/User.context";

// Import Back-End API Endpoints
import { apiClient, backendApiRoutes } from "../../config/backend.config";

import asyncStorageKeys from "../../config/asyncStorageKeys";

// Import JWT Token Parser
import JwtTokenParser from "../../utils/JwtTokenParser";

// Import Components
import FloatingLabelInput from "../../components/FloatingLabelInput/FloatingLabelInput.component";
import AuthContainer from "../../components/AuthContainer/AuthContainer.component";
import AuthTitle from "../../components/AuthTitle/AuthTitle.component";
import AuthLink from "../../components/AuthLink/AuthLink.component";
import AuthPic from "../../components/AuthPic/AuthPic.component";
import AuthFooter from "../../components/AuthFooter/AuthFooter.component";
import CustomBtn from "../../components/CustomBtn/CustomBtn.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";

import PropTypes from "prop-types";

function Login ({ navigation }) {

    // Set user in context
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    // Handle whether the CustomBtn Should be disabled or not
    useEffect(() => {
        // Get valid states of both email and password inputs
        const emailValid = EmailValidator.isValidEmail(email);
        const passwordValid = PasswordValidator.isValidPassword(password);

        // Set whether it should be disabled or not
        setIsBtnDisabled(!(emailValid && passwordValid));

    }, [email, password]);

    // This code will only run if everything is valid
    const handleLogin = async () => {
        try
        {
            // Prepare Payload to send to the backend
            const loginPayload = {
                email: email,
                password: password
            };

            // Send Axios POST Request
            const response = await apiClient.post(backendApiRoutes.springUserRoutes.login, loginPayload);

            // Grab token cookie
            const tokenCookie = response.headers["set-cookie"][0];

            // Grab the JWT token
            const token = JwtTokenParser.extractJwtToken(tokenCookie);

            // Grab the expiry date
            const expiryDate = JwtTokenParser.extractJwtExpiryDate(tokenCookie);
            
            // Save token in AsyncStorage and expiry date
            await AsyncStorage.setItem(asyncStorageKeys.jwtToken, token);
            await AsyncStorage.setItem(asyncStorageKeys.jwtExpiryDate, expiryDate);

            // Set the user to the data received from the back-end
            setUser({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                pic: response.data.pic
            });
        }

        catch (error)
        {
            // console.log(error);
            // Grab Error Msg from the Back-End
            // If no response, then network failure
            if (error instanceof AxiosError)
            {
                const errorMsg = error.response.data.error;

                // await apiClient.post(backendApiRoutes.springUserRoutes.logout);
                
                Toast.fail(errorMsg);
            }

            else 
            {
                console.log(error);
            }
        }
    };

    return (
            <AuthContainer>
                <AuthPic />
                <AuthTitle title="Log In"/>
                <FloatingLabelInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    validatingFunc={EmailValidator.isValidEmail}
                    errorMsg="Invalid email format"
                />
                <FloatingLabelInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    validatingFunc={PasswordValidator.isValidPassword}
                    errorMsg="Password must be at least 8 characters and contain a number, lowercase, uppercase letter, and no symbols or whitespace"
                />
                {
                    isBtnDisabled && (
                        <CustomBtn
                        title="Submit"
                        onPress={null}
                        styleBtn={{
                            marginTop: theme.radius_lg,
                            backgroundColor: theme.brand_primary,
                            padding: theme.radius_lg * 2,
                            opacity: 0.5
                        }}
                        styleTitle={{
                            color: theme.fill_base,
                            fontSize: theme.radius_lg * 2 + 5
                        }}
                    />
                    )
                }
                {
                    !isBtnDisabled && (
                        <CustomBtn
                        title="Submit"
                        onPress={handleLogin}
                        styleBtn={{
                            marginTop: theme.radius_lg,
                            backgroundColor: theme.brand_primary,
                            padding: theme.radius_lg * 2
                        }}
                        styleTitle={{
                            color: theme.fill_base,
                            fontSize: theme.radius_lg * 2 + 5
                        }}
                    />
                    )
                }
                <AuthFooter>
                    <AuthLink
                        title="Need an account?"
                        to="Register"
                        navigation={navigation}
                    />
                    <AuthLink
                        title="Forgot your password?"
                        to="ForgotPassword"
                        navigation={navigation}
                    />
                </AuthFooter>
            </AuthContainer>
    );
};

export default Login;

Login.propTypes = {
    navigation: PropTypes.object.isRequired
};