// Styles for the Dashboard Header Screens
import { StyleSheet } from "react-native";

const dashboardHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        fontSize: 20,
        color: "#333",
        marginRight: 15
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    }
});

export default dashboardHeaderStyles;