/** Styles for Job Records */
import { StyleSheet } from "react-native";

const jobRecordsStyles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 16
    },
    tabsContainer: {
        padding: 16,
        alignItems: "center"
    },
    tabBar: {
        backgroundColor: "#e8e8e8"
    },
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

export default jobRecordsStyles;