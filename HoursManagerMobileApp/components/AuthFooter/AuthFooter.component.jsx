/**
 * Footer Container for Authentication Screens
 */
import { View } from "react-native";

// Import footer styles
import authFooterStyles from "./AuthFooter.style";

import PropTypes from "prop-types";

function AuthFooter({ children })
{
    return (
        <View style={authFooterStyles.footer}>
            { children }
        </View>
    );
}

export default AuthFooter;

AuthFooter.propTypes = {
    children: PropTypes.node.isRequired
};