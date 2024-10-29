import React, { useState, useEffect, useContext } from "react";
import { Toast } from "@ant-design/react-native";

// Import App Theme Obj
import theme from "../../config/theme.config";

// Import Validators for Register Page
import NameValidator from "../../validators/namevalidator.validator";
import EmailValidator from "../../validators/emailvalidator.validator";
import PasswordValidator from "../../validators/passwordvalidator.validator";

// Import User Context
import { UserContext } from "../../contexts/User/User.context";

// Import Back-End API Endpoints
import { apiClient, backendApiRoutes } from "../../config/backend.config";

import JwtTokenParser from "../../utils/JwtTokenParser";

// Import AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AxiosError } from "axios";

// Import Components
import FloatingLabelInput from "../../components/FloatingLabelInput/FloatingLabelInput.component";
import AuthContainer from "../../components/AuthContainer/AuthContainer.component";
import AuthTitle from "../../components/AuthTitle/AuthTitle.component";
import AuthLink from "../../components/AuthLink/AuthLink.component";
import AuthPic from "../../components/AuthPic/AuthPic.component";
import AuthFooter from "../../components/AuthFooter/AuthFooter.component";
import CustomBtn from "../../components/CustomBtn/CustomBtn.component";
import asyncStorageKeys from "../../config/asyncStorageKeys";

import PropTypes from "prop-types";

function Register({ navigation })
{
    // Set user in context
    const { setUser } = useContext(UserContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    // Verifying function for confirmPassword input
    const confirmPasswordVerifyingFunc = (text) => {
        return PasswordValidator.isValidPassword(text) && (text === password);
    };

    // Control whether the submit btn should be disabled or not
    useEffect(() => {
        // Get valid states of name, email, password, and confirmPassword
        const nameValid = NameValidator.isValidName(name);
        const emailValid = EmailValidator.isValidEmail(email);
        const passwordValid = PasswordValidator.isValidPassword(password);
        const confirmPasswordValid = PasswordValidator.isValidPassword(confirmPassword);

        // Confirm password and confirmPassword match
        const passwordsMatch = password === confirmPassword;

        // If all conditions are true, then do not make it disabled
        setIsBtnDisabled(!(nameValid && emailValid && passwordValid && confirmPasswordValid && passwordsMatch));

    }, [name, email, password, confirmPassword]);

    // Handle registrying operation
    const handleRegister = async () => {

        try
        {
            // Prepare Payload to send to the backend
            const registerPayload = {
                name: name,
                email: email,
                password: password
            };

            // Send Axios POST Request
            const response = await apiClient.post(backendApiRoutes.springUserRoutes.register, registerPayload);

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
            // Grab Error Msg from the Back-End
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
            <AuthTitle title="Register" />
            <FloatingLabelInput
                label="Name"
                value={name}
                validatingFunc={NameValidator.isValidName}
                onChangeText={setName}
                errorMsg="Please provide a valid name"
            />
            <FloatingLabelInput
                label="Email"
                value={email}
                validatingFunc={EmailValidator.isValidEmail}
                onChangeText={setEmail}
                errorMsg="Invalid email format"
            />
            <FloatingLabelInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                validatingFunc={PasswordValidator.isValidPassword}
                secureTextEntry
                errorMsg="Password must be at least 8 characters and contain a number, lowercase, uppercase letter, and no symbols or whitespace"
            />
            <FloatingLabelInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                validatingFunc={confirmPasswordVerifyingFunc}
                secureTextEntry
                errorMsg="Please confirm passwords match"
            />
            {isBtnDisabled && (
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
            )}
            {
            !isBtnDisabled && (
                    <CustomBtn
                        title="Submit"
                        onPress={handleRegister}
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
                    title="Already have an account?"
                    to="Login"
                    navigation={navigation}
                />
            </AuthFooter>
        </AuthContainer>
    );
}

export default Register;

Register.propTypes = {
    navigation: PropTypes.object.isRequired
};