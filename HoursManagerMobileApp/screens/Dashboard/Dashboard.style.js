/** General Styles for the Dashboard Screen */
import { StyleSheet } from "react-native";

const dashboardScreenStyles = StyleSheet.create({
    scroll: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15
    },
    cardsContainer: {
        alignSelf: "stretch",
        marginLeft: 20,
        marginRight: 20
    }
});

export default dashboardScreenStyles;