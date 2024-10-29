/**
 * Dynamic styles for Custom Btn
 */

import theme from "../../config/theme.config";
import { StyleSheet } from "react-native";

const customBtnStyles = StyleSheet.create({
    button: {
        borderRadius: theme.radius_md,
        paddingVertical: theme.radius_md + 6,
        paddingHorizontal: theme.radius_lg + 7,
        alignItems: "center"
    }
});

export default customBtnStyles;