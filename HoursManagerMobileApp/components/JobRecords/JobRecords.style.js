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
        bacgroundColor: "#aaa"
    },
    tabText: {
        marginBottom: 8,
        textAlign: "center"
    }
});

export default jobRecordsStyles;