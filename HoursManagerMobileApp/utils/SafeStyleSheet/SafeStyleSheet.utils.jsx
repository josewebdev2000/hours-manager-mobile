/**
 * Safe Style Sheet
 * RN StyleSheet meant to provide safe limits to each screen
 */

import { StyleSheet } from "react-native";

function getSafeStyleSheet(top, bottom)
{
    return StyleSheet.create({
        screenContainer: {
            paddingTop: top,
            paddingBottom: bottom
        }
    });
}

export default getSafeStyleSheet;