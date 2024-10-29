// Import the theme
import theme from "../../config/theme.config";

// Styles for the Floating Label
import { StyleSheet } from "react-native";

const floatingLabelInputStyles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
        position: "relative"
    },
    label: {
        position: "absolute",
        left: 0,
        top: 15,
        fontSize: 16,
        color: "#aaa"
    },
    floatingLabel: {
        top: -10,
        fontSize: 12,
        color: theme.brand_primary
    },
    floatingLabelHidden: {
        display: "none"
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    icon: {
        position: "absolute",
        right: 10,
        top: 15
    },
    errorText: {
       color: theme.brand_error,
       fontSize: theme.radius_lg * 2 - 2,
       marginTop: theme.radius_md + 1,
       textAlign: "center"
    }
});

export default floatingLabelInputStyles;