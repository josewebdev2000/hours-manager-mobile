// Styles for NumCodeInput
import { StyleSheet } from "react-native";

const NumCodeInputStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20
    },
    pinInput: {
        borderBottomWidth: 2,
        borderBottomColor: "#000",
        width: 40,
        fontSize: 24,
        textAlign: "center",
        padding: 5
    }
});

export default NumCodeInputStyles;