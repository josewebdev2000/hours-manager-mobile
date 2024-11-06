/**
 * Job Records for the Dashboard Screen
 * But later could be used for calculations screen or others
 */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Tabs } from "@ant-design/react-native";

import JobRecordTabRow from "../JobRecordTabRow/JobRecordTabRow.component";

// Import data and stylesheet
import jobRecordsStyles from "./JobRecords.style";
import { tabTitles, data } from "./JobRecords.data";

function JobRecords ({ setJobRecordsHeight })
{

    return (
        <View style={jobRecordsStyles.container}>
            <Text style={jobRecordsStyles.title}>
                Job Records
            </Text>
            <Tabs tabs={tabTitles} initialPage={0} tabBarBackgroundColor="#eeeeed">
                {
                    tabTitles.map(tab => (
                        <View 
                            key={tab.title}
                            style={jobRecordsStyles.tabsContainer}
                        >
                            {
                                data[tab.title].map((item, index) => (
                                    <JobRecordTabRow
                                        key={index}
                                        index={index}
                                        setJobRecordsHeight={setJobRecordsHeight}
                                        text={item}
                                    />
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