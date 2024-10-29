/**
 * Dashboard Drawer
 * Drawer Navigation for all screens that have to do with the dashboard
 * 
 */

import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "../../screens/Dashboard/Dashboard.screen";
import Profile from "../../screens/Profile/Profile.screen";

const Drawer = createDrawerNavigator();

function DashboardDrawer()
{
    return (
    <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard}/>
        <Drawer.Screen name="Profile" component={Profile}/>
    </Drawer.Navigator>
    );
}

export default DashboardDrawer;