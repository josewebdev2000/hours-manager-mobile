// Component for each Data field in the Job Record Section
import React, { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";

// Import styles
import jobRecordsTabRowStyles from "./JobRecordTabRow.style";

function JobRecordTabRow({ index, setJobRecordsHeight, text })
{
    // Run useEffect to set jobRecord Height as soon as the component is mounted
    useEffect(() => {
        const indexMultFactor = index + 1;

        const jobHeight = indexMultFactor * jobRecordsTabRowStyles.tabRow.height;
        console.log(jobHeight);

        // Access the previous jobHeight and add the 
        setJobRecordsHeight(jobHeight);
    }, []);

    return (
        <TouchableOpacity style={jobRecordsTabRowStyles.tabRow}>
            <Text style={jobRecordsTabRowStyles.tabText}>{text}</Text>
        </TouchableOpacity>
    );
}

export default JobRecordTabRow;