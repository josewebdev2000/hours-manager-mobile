/**
 * 
 */

import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

// Import Styles
import authLinkStyles from "./AuthLink.style";

import PropTypes from "prop-types";

function AuthLink({ title, to, navigation })
{
    return (
        <TouchableOpacity onPress={() => navigation.navigate(to)}>
            <Text style={authLinkStyles.link}>{title}</Text>
        </TouchableOpacity>
    );
}

export default AuthLink;

AuthLink.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired
};