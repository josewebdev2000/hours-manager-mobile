/**
 * Custom Button Component for this app
 * Use mostly for submit btns
 */

import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

// Import stylesheet function
import customBtnStyles from "./CustomBtn.style";

import PropTypes from "prop-types";

function CustomBtn({ title, styleBtn, styleTitle, onPress })
{
    return (
        <TouchableOpacity
            style={[customBtnStyles.button, styleBtn]}
            onPress={onPress}
        >
            <Text style={[styleTitle]}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomBtn;

CustomBtn.propTypes = {
    title: PropTypes.string.isRequired,
    styleBtn: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    styleTitle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    onPress: PropTypes.func
};