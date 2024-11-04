/**
 * Dashboard Drawer
 * Drawer Navigation for all screens that have to do with the dashboard
 * 
 */

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import Dashboard from "../../screens/Dashboard/Dashboard.screen";
import Profile from "../../screens/Profile/Profile.screen";

// Import Components
import DashboardContent from "../../components/DashboardContent/DashboardContent.component";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader.component";
import DashboardPic from "../../components/DashboardPic/DashboardPic.component";

const Drawer = createDrawerNavigator();

function DashboardDrawer()
{
    return (
    <Drawer.Navigator 
        initialRouteName="Dashboard"
        drawerContent={props => <DashboardContent {...props}/>}
        >
        <Drawer.Screen 
            name="Dashboard" 
            component={Dashboard}
            options={{
                headerTitle: () => <DashboardHeader titleContent="Dashboard" />,
                headerRight: () => <DashboardPic />
            }}
        />
        <Drawer.Screen 
            name="Profile" 
            component={Profile}
            options={{
                headerTitle: () => <DashboardHeader titleContent="Profile" />,
                headerRight: () => <DashboardPic />
            }}
        />
    </Drawer.Navigator>
    );
}

export default DashboardDrawer;