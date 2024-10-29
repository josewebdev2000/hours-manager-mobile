/**
 * Styles for Auth Pic to show Hours Manager Icon
 */

// Import Theme
import theme from "../../config/theme.config";

import { StyleSheet } from "react-native";

const authPicStyles = StyleSheet.create({
    pic: {
        alignSelf: "center",
        marginBottom: theme.radius_lg * 2
    }
});

export default authPicStyles;