/**
 * Container for Authentication Screens
 */

import { SafeAreaView, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import styles
import getSafeStyleSheet from "../../utils/SafeStyleSheet/SafeStyleSheet.utils";
import authContainerStyles from "./AuthContainer.style";

import PropTypes from "prop-types";

function AuthContainer({ children })
{
    // Import limits for Safe Rendering
    const insets = useSafeAreaInsets();

    // Get Safe Styles for Login Page
    const loginSafeStyleSheet = getSafeStyleSheet(insets.top, insets.bottom);

    return (
        <SafeAreaView style={[loginSafeStyleSheet, authContainerStyles.container]}>
            <View style={authContainerStyles.box}>
                {children}
            </View>
        </SafeAreaView>
    );
}

export default AuthContainer;

AuthContainer.propTypes = {
    children: PropTypes.node.isRequired
};

