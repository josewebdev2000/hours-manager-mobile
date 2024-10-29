/**
 * Styles for Auth Link to authenticate
 */

// Import theme
import theme from "../../config/theme.config";

import { StyleSheet } from "react-native";

const authLinkStyles = StyleSheet.create({
    link: {
        color: theme.brand_primary,
        textDecorationLine: "underline",
        marginVertical: 5
    }
});

export default authLinkStyles;