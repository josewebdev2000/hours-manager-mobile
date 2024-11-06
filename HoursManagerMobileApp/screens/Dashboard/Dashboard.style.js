/** General Styles for the Dashboard Screen */
import { StyleSheet } from "react-native";

const dashboardScreenStyles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
    },
    container: {
        paddingBottom: 0,
        marginBottom: 0,
        padding: 15,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    cardsContainer: {
        alignSelf: "stretch",
        marginLeft: 20,
        marginRight: 20
    }
});

export default dashboardScreenStyles;