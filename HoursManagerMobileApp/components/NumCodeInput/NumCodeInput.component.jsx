/** Special TextInput component for numeric codes */
import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";

import NumCodeInputStyles from "./NumCodeInput.style";

function NumCodeInput({ pinLength = 6, onPinComplete })
{
    // Hold the entered pin digits
    const [pin, setPin] = useState(Array(pinLength).fill(""));

    // Refs for each input field
    const inputRefs = useRef([]);

    // Function to handle input change for each field
    const handleChange = (value, i) => {

        if (isNaN(value) || value.length > 1) return; // prevent non-numeric or multiple digits
        const newPin = [...pin];
        newPin[i] = value;
        setPin(newPin);

        // Focus the next input field if a value is entered
        if (value !== "" && i < pinLength - 1)
        {
            inputRefs.current[i + 1].focus();
        }

        // Trigger callback when PIN is complete
        if (newPin.every(digit => digit !== ""))
        {
            onPinComplete(newPin.join(""));
        }
    };

    // Handle backspace and move to the previous input
    const handleKeyPress = (e, i) => {
        if (e.nativeEvent.key === "Backspace")
        {
            if (pin[i] === "" && i > 0)
            {
                inputRefs.current[i - 1].focus();
            }

            else if (pin[i] !== "")
            {
                const newPin = [...pin];
                newPin[i] = "";
                setPin(newPin);
            }
        }
    };

    return (
        <View style={NumCodeInputStyles.container}>
            {
                Array(pinLength)
                    .fill()
                    .map((_, i) => (
                        <TextInput
                            key={i}
                            ref={(el) => inputRefs.current[i] = el}
                            style={NumCodeInputStyles.pinInput}
                            value={pin[i]}
                            onChangeText={(value) => handleChange(value, i)}
                            onKeyPress={(e) => handleKeyPress(e, i)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                    ))
            }
        </View>
    );
}

export default NumCodeInput;