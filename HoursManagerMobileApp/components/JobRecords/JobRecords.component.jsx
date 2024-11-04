/**
 * Job Records for the Dashboard Screen
 * But later could be used for calculations screen or others
 */
import React from "react";
import { View, Text } from "react-native";
import { Tabs } from "@ant-design/react-native";

// Import data and stylesheet
import jobRecordsStyles from "./JobRecords.style";
import { tabTitles, data } from "./JobRecords.data";

function JobRecords ()
{
    return (
        <View style={jobRecordsStyles.container}>
            <Text style={jobRecordsStyles.title}>
                Job Records
            </Text>
            <Tabs tabs={tabTitles} initialPage={0} tabBarTextStyle={jobRecordsStyles.tabBar}>
                {
                    tabTitles.map(tab => (
                        <View 
                            key={tab.title}
                            style={jobRecordsStyles.tabsContainer}
                        >
                            {
                                data[tab.title].map((item, index) => (
                                    <Text key={index} style={jobRecordsStyles.tabText}>
                                        {item}
                                    </Text>
                                ))
                            }
                        </View>
                    ))
                }
            </Tabs>
        </View>
    );
}

export default JobRecords;