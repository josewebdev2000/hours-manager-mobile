// Header to any Dashboard Screen

import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import dashboardHeaderStyles from "./DashboardHeader.style";

// Grab the icon name from the tilteContent
const getIconNameFromTitle = (title) => {
    switch (title)
    {
        case "Dashboard":
            return "th-list";
        
        case "Profile":
            return "user-alt";
    }
};

function DashboardHeader({ titleContent })
{
    return (
        <View style={dashboardHeaderStyles.container}>
            <Icon 
                name={getIconNameFromTitle(titleContent)}
                size={dashboardHeaderStyles.icon.fontSize}
                color={dashboardHeaderStyles.icon.color}
                style={{
                    marginRight: dashboardHeaderStyles.icon.marginRight
                }}
            />
            <Text style={dashboardHeaderStyles.text}>
                {titleContent}
            </Text>
        </View>
    );
}

export default DashboardHeader;