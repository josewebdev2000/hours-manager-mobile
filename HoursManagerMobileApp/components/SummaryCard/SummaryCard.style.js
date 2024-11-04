/** Styles for the Summary Card */
import { StyleSheet } from "react-native";

const summaryCardStyles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    },
    content: {
        fontSize: 16,
        color: "#fff",
        marginTop: 5,
        textAlign: "center"
    }
});

export default summaryCardStyles;