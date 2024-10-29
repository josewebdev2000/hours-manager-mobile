import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, Animated } from "react-native";

// Import Ant Design Icon
import { Icon } from "@ant-design/react-native";

import theme from "../../config/theme.config";

// Import StyleSheet
import floatingLabelInputStyles from "./FloatingLabelInput.style";

import PropTypes from "prop-types";

function FloatingLabelInput({ label, value, onChangeText, secureTextEntry, validatingFunc, errorMsg })
{
    const [ isFocused, setIsFocused ] = useState(false);
    const [isValid, setIsValid] = useState(true); // Track validity of input
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(secureTextEntry);
    const [error, setError] = useState(""); // Track error msg

    // Create animated values for label position and font size
    const animatedLabelPosition = useRef(new Animated.Value(value ? -10 : 15)).current;
    const animatedLabelFontSize = useRef(new Animated.Value(value ? 12 : 16)).current;

    // Function to execute as user types in the input
    const handleChangeText = (text) => {
        // Check if there is a validator
        if (validatingFunc)
        {
            // Check validation status of input rn
            const validStatus = validatingFunc(text);

            // Set the state
            setIsValid(validStatus);

            // If is valid, no need for error messsage, otherwise set it to the given prop
            setError(validStatus ? "" : errorMsg);
        }
        onChangeText(text);
    };

    // Side effect to animate label when onFocus or onBlur
    useEffect(() => {
        Animated.timing(animatedLabelPosition, {
            toValue: isFocused || value ? -10 : 15, // Move label to top when focus or value exists
            duration: 200,
            useNativeDriver: false
        }).start();

        Animated.timing(animatedLabelFontSize, {
            toValue: isFocused || value ? 12 : 16, // Change font size when focused or value exists
            duration: 200,
            useNativeDriver: false
        }).start();

    }, [isFocused, value]);


    return (
        <View style={floatingLabelInputStyles.inputContainer}>
            <Animated.Text style={
                [
                    floatingLabelInputStyles.label,
                    isFocused || value ? floatingLabelInputStyles.floatingLabel : floatingLabelInputStyles.floatingLabelHidden,
                    (!isValid && isFocused) && {color: theme.brand_error } // Change label color if invalid

                ]}>{label}</Animated.Text>
            <TextInput
                style={[
                    floatingLabelInputStyles.input,
                    (!isValid && isFocused) && { borderBottomColor : theme.brand_error } // Change input border if invalid
                ]}
                value={value}
                onChangeText={handleChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {setIsFocused(value.length === 0 ? false : true )}}
                placeholder={isFocused ? '' : label }
                secureTextEntry={isPasswordVisible}
            />
            {
                secureTextEntry && (
                    <TouchableOpacity
                        style={floatingLabelInputStyles.icon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon name={isPasswordVisible ? 'eye-invisible' : 'eye'} size={24} color="#aaa"/>
                    </TouchableOpacity>
                )
            }
            {
                (!isValid && isFocused) && (
                    <Text style={floatingLabelInputStyles.errorText}>{error}</Text>
                )
            }
        </View>
    );
}

export default FloatingLabelInput;

FloatingLabelInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    errorMsg: PropTypes.string
};