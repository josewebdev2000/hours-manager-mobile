/**
 * Summary Card to be used throughout the app
 * It shows relevant info about a detail
 */

import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Import Styles
import summaryCardStyles from "./SummaryCard.style";

function SummaryCard({ title, content, colors })
{
    // Expect colors to be an array of 2 color strings
    return (
        <LinearGradient
            colors={colors}
            style={summaryCardStyles.card}
        >
            <Text style={summaryCardStyles.title}>{title}</Text>
            <Text style={summaryCardStyles.content}>{content}</Text>
        </LinearGradient>
    );
}

export default SummaryCard;