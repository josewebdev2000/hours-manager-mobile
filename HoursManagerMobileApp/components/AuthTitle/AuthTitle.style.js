// StyleSheet for AuthTitle

import { StyleSheet } from "react-native";

import theme from "../../config/theme.config";

const authTitleStyles = StyleSheet.create({
    title: {
        fontSize: 48,
        color: theme.brand_primary,
        marginBottom: 20,
        textAlign: "center"
    }
});

export default authTitleStyles;