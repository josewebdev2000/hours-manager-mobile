/** Dashboard Content Component to customize the Dashboard
 * of the Mobile App
 * Place
 * Hours Manager Logo
 * Profile Picture - Profile Username
 * Screens Navigation
 * Logout Button
 */
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";

// Import UserContext
import { UserContext } from "../../contexts/User/User.context";

// Import Avatars URLs
import Avatar from "../../config/avatars";

// Import StyleSheet
import dashboardContentStyles from "./DashboardContent.style";

function DashboardContent(props)
{
    // Import the user context to display user data
    const { user } = useContext(UserContext);

    // Get the profile pic and name from the user
    const userName = user.name;
    const userPic = user.pic;

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={dashboardContentStyles.container}
        >
            {/**Brand Logo and Name */}
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Dashboard")}
            >
                <View style={dashboardContentStyles.brandContainer}>
                    <Image 
                        source={{
                            uri: Avatar.LOGO
                        }}
                        style={dashboardContentStyles.profileImage}
                    />
                    <Text style={dashboardContentStyles.brandText}>Hours Manager</Text>
                </View>
            </TouchableOpacity>

            {/** Place divider */}
            <View style={dashboardContentStyles.divider}></View>

            {/* User Profile */}
            <View style={dashboardContentStyles.userPanel}>
                <Image
                    source={{
                        uri: userPic
                    }}
                    style={dashboardContentStyles.profileImage}
                />
                <Text style={dashboardContentStyles.userName}>{userName}</Text>
            </View>

            {/** Place divider */}
            <View style={dashboardContentStyles.divider}></View>

            {/** Navigation Links */}
            <DrawerItem
                label="Dashboard"
                onPress={() => props.navigation.navigate("Dashboard")}
                labelStyle={dashboardContentStyles.drawerLabel}
                icon={() => <Icon name="th-list" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color}/>}
            />

            <DrawerItem
                label="Profile"
                onPress={() => {}}
                labelStyle={dashboardContentStyles.drawerLabel}
                icon={() => <Icon name="user-alt" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color} />}
            />

            <DrawerItem
                label="Jobs"
                labelStyle={dashboardContentStyles.drawerLabel}
                onPress={() => {}}
                icon={() => <Icon name="suitcase" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color}/>}
            />

            <DrawerItem
                label="Work Shifts"
                labelStyle={dashboardContentStyles.drawerLabel}
                onPress={() => {}}
                icon={() => <Icon name="business-time" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color}/>}
            />

            <DrawerItem
                label="Calculations"
                labelStyle={dashboardContentStyles.drawerLabel}
                onPress={() => {}}
                icon={() => <Icon name="calculator" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color}/>}
            />

            <DrawerItem
                label="Predictions"
                labelStyle={dashboardContentStyles.drawerLabel}
                onPress={() => {}}
                icon={() => <Icon name="chart-line" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color} />}
            />

            <View style={dashboardContentStyles.bigDivider}></View>

            {/**Logout */}
            <DrawerItem
                label="Log Out"
                labelStyle={dashboardContentStyles.drawerLabel}
                onPress={() => {}}
                icon={() => <Icon name="" size={dashboardContentStyles.drawerIcon.fontSize} color={dashboardContentStyles.drawerIcon.color}/>}
            />


        </DrawerContentScrollView>
    );
}

export default DashboardContent;