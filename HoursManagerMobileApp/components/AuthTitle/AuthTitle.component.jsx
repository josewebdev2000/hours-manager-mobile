/**
 * Title for Authentication Screens
 */

import { Text } from "react-native";

// Import Styles
import authTitleStyles from "./AuthTitle.style";

import PropTypes from "prop-types";

function AuthTitle({ title })
{
    return <Text style={authTitleStyles.title}>{title}</Text>;
}

export default AuthTitle;

AuthTitle.propTypes = {
    title: PropTypes.string.isRequired
};