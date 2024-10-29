/** Screen for the Forgot Password Page */
import React, { useState, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Toast } from "@ant-design/react-native";

// Import App Theme Obj
import theme from "../../config/theme.config";

// Import Validators
import EmailValidator from "../../validators/emailvalidator.validator";
import PasswordValidator from "../../validators/passwordvalidator.validator";
import PinValidator from "../../validators/pinvalidator.validator";

// Import AsyncStorage and its keys
import AsyncStorage from "@react-native-async-storage/async-storage";

import asyncStorageKeys from "../../config/asyncStorageKeys";

// Import Back-End API Endpoints
import { apiClient, backendApiRoutes } from "../../config/backend.config";
import { AxiosError } from "axios";

// Import Components
import NumCodeInput from "../../components/NumCodeInput/NumCodeInput.component";
import FloatingLabelInput from "../../components/FloatingLabelInput/FloatingLabelInput.component";
import AuthContainer from "../../components/AuthContainer/AuthContainer.component";
import AuthTitle from "../../components/AuthTitle/AuthTitle.component";
import AuthLink from "../../components/AuthLink/AuthLink.component";
import AuthPic from "../../components/AuthPic/AuthPic.component";
import AuthFooter from "../../components/AuthFooter/AuthFooter.component";
import CustomBtn from "../../components/CustomBtn/CustomBtn.component";

// Import PasswordToken Context
import { PasswordTokenContext } from "../../contexts/PasswordToken/PasswordToken.context";

// Import Password Reset Check Validator Requester
import { isPasswordResetTokenValidApiRequest } from "../../utils/requesters/PasswordTokenRequester";

import PropTypes from "prop-types";

function ForgotPassword({ navigation })
{
    // Use State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    // Use the contexts
    const { 
        passwordTokenRequested, 
        setPasswordTokenRequested,
        passwordToken,
        setPasswordToken,
        isPasswordTokenValid,
        setIsPasswordTokenValid
     } = useContext(PasswordTokenContext);

     const confirmPasswordInput = (text) => {
        return PasswordValidator.isValidPassword(text) && (text === password);
     }

     // Load a useEffect to check the validity of the current token
     // If invalid, then delete all asyncstorage values and set context values to default
     useEffect(() => {
        if (passwordToken)
        {
            isPasswordResetTokenValidApiRequest(passwordToken)
                .catch(error => {
                    AsyncStorage.multiRemove([asyncStorageKeys.passwordResetToken, asyncStorageKeys.passwordResetTokenRequested, asyncStorageKeys.passwordResetTokenValid]);

                    setPasswordToken(null);
                    setPasswordTokenRequested(JSON.stringify(false));
                    setIsPasswordTokenValid(JSON.stringify(false));
                })
        }
     }, []);

     // Use effect to disable Btn for email, passwordToken, password, and confirmPassword
     useEffect(() => {
         // If the password reset token has not yet been requested
         // Set is to valid if the email is valid
         if (!JSON.parse(passwordTokenRequested))
         {
             // Check if the given email is of valid format
             const emailValid = EmailValidator.isValidEmail(email);
 
             // Set btn disabled to false if email is valid
             setIsBtnDisabled(!emailValid);
         }
 
         else
         {
             if (!JSON.parse(isPasswordTokenValid))
             {
                 // Check if the given token is valid or not
                 const tokenValid = PinValidator.isValidPin(passwordToken);

                 console.log("Valid Token", tokenValid);
 
                 // Set the btn to false if email is valid
                 setIsBtnDisabled(!tokenValid);
             }
 
             else
             {
                 // Check the password and confirm passwords are valid and match
                 const passwordValid = PasswordValidator.isValidPassword(password);
                 const confirmPasswordValid = confirmPasswordInput(confirmPassword);

                 // Set the btn to false if passwords, confirm password, and match is valid
                 setIsBtnDisabled(!(passwordValid && confirmPasswordValid));
             }
         }
 
     }, [email, password, confirmPassword, passwordToken]);

    // In case the password reset token has not been requested, ask for user's email
    const handleEmailRequestPasswordToken = async () => {

        try
        {
            // Prepare Payload to send to the API
            const requestTokenPayload = {
                email: email
            };
            
            // Send Axios POST Request
            const response = await apiClient.post(backendApiRoutes.passwordResetTokenRoutes.requestToken, requestTokenPayload);

            // Extract the JSON payload from the response
            const { data } = response;

            // Extract the message and show it as a Toast
            const { message } = data;

            Toast.success(message);

            // Save in AsyncStorage the password that has been requested
            await AsyncStorage.setItem(asyncStorageKeys.passwordResetTokenRequested, JSON.stringify(true));

            // Set that the password token has been requested
            setPasswordTokenRequested(true);
        }

        catch (error)
        {
            if (error instanceof AxiosError)
            {
                const errorMsg = error.response.data.error;
                Toast.fail(errorMsg);
            }

            else
            {
                console.log(error);
            }
        }    
    };

    // In case the password reset token has been requested, but has not yet been verified
    const handleValidatePasswordToken = async () => {

        try
        {
            const { isValid } = await isPasswordResetTokenValidApiRequest(passwordToken);

            // Set in Async Storage the validity of the password
            await AsyncStorage.setItem(asyncStorageKeys.passwordResetTokenValid, JSON.stringify(isValid));

            // Set in Async Storage the token itself
            await AsyncStorage.setItem(asyncStorageKeys.passwordResetToken, passwordToken);

            // Set the password token as well
            setPasswordToken(passwordToken);

            // Set the password requested is valid
            setIsPasswordTokenValid(isValid);
        }

        catch (error)
        {
            if (error instanceof AxiosError)
            {
                const errorData = error.response.data;

                if (errorData.message)
                {
                    const isValid = errorData.isValid;
                    const errorMsg = errorData.mesasge;
                    Toast.fail(errorMsg);

                    // Set it in Async Storage too
                    // Delete from async storage the password reset token valid if it is there
                    await AsyncStorage.removeItem(asyncStorageKeys.passwordResetTokenValid);

                    // Set the password requested is not valid
                    setIsPasswordTokenValid(isValid);
                }

                else
                {
                    const errorMsg = error.response.data.error;
                    Toast.fail(errorMsg);
                }
            }

            else
            {
                console.log(error);
            }
        }
    };

    // In case the password reset token is valid, then reset the password
    const handleResetUsersPassword = async () => {

        try
        {
            // Grab the stored token from AsyncStorage or the Context
            const storedPasswordToken = passwordToken || await AsyncStorage.getItem(asyncStorageKeys.passwordResetToken);

            // Prepare the payload to send to the back-end
            const passwordResetPayload = {
                token: storedPasswordToken,
                password: password
            };

            // Send Axios POST Request
            const response = await apiClient.post(backendApiRoutes.passwordResetTokenRoutes.resetPassword, passwordResetPayload);

            // Grab data from the response
            const { data } = response;

            // Extract the message and show it as a Toast
            const { message } = data;

            Toast.success(message);

            // Set the password context variables to their default values
            setPasswordToken(null);
            setPasswordTokenRequested(false);
            setIsPasswordTokenValid(false);

            // Delete all the async storage keys
            await AsyncStorage.multiRemove([asyncStorageKeys.passwordResetToken, asyncStorageKeys.passwordResetTokenRequested, asyncStorageKeys.passwordResetTokenValid]);
        }

        catch (error)
        {
            if (error instanceof AxiosError)
            {
                const errorMsg = error.response.data.error;
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
            <AuthTitle title={JSON.parse(passwordTokenRequested) ? "Change Old Password" : "Request Password Change"}/>
            {
                !JSON.parse(passwordTokenRequested)
                    ?
                        (
                            <FloatingLabelInput
                                label="Email"
                                value={email}
                                validatingFunc={EmailValidator.isValidEmail}
                                errorMsg="Invalid email format"
                                onChangeText={setEmail}
                            />
                        )
                    :

                    JSON.parse(isPasswordTokenValid)
                        ? 
                        (
                            <>
                                <FloatingLabelInput 
                                    label="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    validatingFunc={PasswordValidator.isValidPassword}
                                    errorMsg="Password must be at least 8 characters and contain a number, lowercase, uppercase letter, and no symbols or whitespace"
                                />
                                <FloatingLabelInput
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    validatingFunc={confirmPasswordInput}
                                    errorMsg="Make sure the password and the confirm password match"
                                />
                            </>
                        )
                        :
                        (
                            <View>
                                <Text style={{textAlign: "center", fontSize: 16}}>Enter Email Received Token</Text>
                                <NumCodeInput
                                    pinLength={6}
                                    onPinComplete={(t) => setPasswordToken(t)}
                                />
                            </View>
                        )
                        
            }
            {
                isBtnDisabled && (
                        <CustomBtn
                            title={JSON.parse(passwordTokenRequested) ? (JSON.parse(isPasswordTokenValid) ? "Change" : "Submit") : "Request"}
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
                            onPress={null}
                        />
                )
            }
            {
                !isBtnDisabled && (
                        <CustomBtn
                            title={JSON.parse(passwordTokenRequested) ? (JSON.parse(isPasswordTokenValid) ? "Change" : "Submit") : "Request"}
                            styleBtn={{
                                marginTop: theme.radius_lg,
                                backgroundColor: theme.brand_primary,
                                padding: theme.radius_lg * 2
                            }}
                            styleTitle={{
                                color: theme.fill_base,
                                fontSize: theme.radius_lg * 2 + 5
                            }}
                            onPress={JSON.parse(passwordTokenRequested) ? (JSON.parse(isPasswordTokenValid) ? handleResetUsersPassword: handleValidatePasswordToken) : handleEmailRequestPasswordToken}
                        />
                )
            }
            <AuthFooter>
                <AuthLink
                    title="Wanna try logging in?"
                    to="Login"
                    navigation={navigation}
                />
            </AuthFooter>
        </AuthContainer>
    );

}

export default ForgotPassword;

ForgotPassword.propTypes = {
    navigation: PropTypes.object.isRequired
};