/**
 * Styles for Container for Authentication Pages
 */

// Import theme
import theme from "../../config/theme.config";

import { StyleSheet } from "react-native";

const authContainerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.fill_base
    },
    box: {
        width: "90%",
        maxWidth: 400,
        padding: 30,
        borderRadius: theme.radius_lg,
        backgroundColor: theme.fill_tap
    }
});

export default authContainerStyles;