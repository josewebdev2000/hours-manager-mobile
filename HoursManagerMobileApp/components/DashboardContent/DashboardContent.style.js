/**
 * Custom styles for the Dashboard Content
 */
import { StyleSheet } from "react-native";
import theme from "../../config/theme.config";

const dashboardContentStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        backgroundColor: "#343A40"
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15
    },
    drawerLabel: {
        color: "#eee",
        fontSize: 15
    },
    drawerIcon: {
        color: "#eee",
        fontSize: 18
    },
    brandImage: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    brandText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "600"
    },
    userPanel: {
        flexDirection: "row",
        alignItems: "center", 
        padding: 15
    },
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 20,
        marginRight: 15
    },
    userName: {
        color: "#fff",
        fontSize: 20
    },
    divider: {
        height: 3,
        width: "100%",
        backgroundColor: "#777"
    },
    bigDivider:{
        height: 7,
        width: "100%",
        backgroundColor: "#BBB"
    }
});

export default dashboardContentStyles;