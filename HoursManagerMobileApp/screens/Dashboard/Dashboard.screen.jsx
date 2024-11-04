import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import dashboardScreenStyles from "./Dashboard.style";

// Import Components
import SummaryCard from "../../components/SummaryCard/SummaryCard.component";
import JobRecords from "../../components/JobRecords/JobRecords.component";

import PropTypes from "prop-types";

// Define gradient colors
const dashboardLinearGradientColors = {
    commonCardColors: ['#673ab7', '#9c27b0'],
    touchableCardColors: ["rgb(59, 158, 255)", "rgb(152, 38, 252)"]
};

function Dashboard({ navigation })
{
    return (
        <ScrollView style={dashboardScreenStyles.scroll}>
            <View style={dashboardScreenStyles.container}>
                <View style={dashboardScreenStyles.cardsContainer}>
                    <SummaryCard 
                        title="Closest Pay Date" 
                        content="19, Dec 2024"
                        colors={dashboardLinearGradientColors.commonCardColors}
                    />
                    <SummaryCard
                        title="Jobs Registered"
                        content="3"
                        colors={dashboardLinearGradientColors.commonCardColors}
                    />
                    <SummaryCard
                        title="Earnings"
                        content="$250"
                        colors={dashboardLinearGradientColors.commonCardColors}
                    />
                    <SummaryCard
                        title="Hours Worked"
                        content="45 Hr"
                        colors={dashboardLinearGradientColors.commonCardColors}
                    />
                    <TouchableOpacity onPress={() => {}}>
                        <SummaryCard
                            title="Add New Job"
                            content="Press here to add a new job"
                            colors={dashboardLinearGradientColors.touchableCardColors}
                        />
                    </TouchableOpacity>
                </View>
                <JobRecords />
            </View>
        </ScrollView>
    );
}

export default Dashboard;

Dashboard.propTypes = {
    navigation: PropTypes.object.isRequired
};