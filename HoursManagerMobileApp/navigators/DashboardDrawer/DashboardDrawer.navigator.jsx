/**
 * Dashboard Drawer
 * Drawer Navigation for all screens that have to do with the dashboard
 * 
 */

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../../screens/Dashboard/Dashboard.screen";
import Profile from "../../screens/Profile/Profile.screen";
import DashboardContent from "../../components/DashboardContent/DashboardContent.component";

const Drawer = createDrawerNavigator();

function DashboardDrawer()
{
    return (
    <Drawer.Navigator 
        initialRouteName="Dashboard"
        drawerContent={props => <DashboardContent {...props}/>}
        >
        <Drawer.Screen name="Dashboard" component={Dashboard}/>
        <Drawer.Screen name="Profile" component={Profile}/>
    </Drawer.Navigator>
    );
}

export default DashboardDrawer;