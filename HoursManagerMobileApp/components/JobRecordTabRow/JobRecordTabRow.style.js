// Styles for each tab row
import { StyleSheet } from "react-native";

const jobRecordsTabRowStyles = StyleSheet.create({
    tabRow: {
        width: "100%",
        height: 50,
        padding: 12,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        marginBottom: 8,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabText: {
        fontSize: 16,
        textAlign: "center"
    }
});

export default jobRecordsTabRowStyles;