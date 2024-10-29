// Screen of the user's profile
import React from "react";
import { View, Text } from "react-native";

import PropTypes from "prop-types";

function Profile({ navigation })
{
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Profile Page</Text>
        </View>
    );
}

export default Profile;

Profile.propTypes = {
    navigation: PropTypes.object.isRequired
};