// Dashboard Pic Component for Dashboard Screens
import { Image } from "react-native";

// Import styles
import dashboardPicStyles from "./DashboardPic.style";

function AuthPic()
{
    return (
        <Image
            source={require("../../assets/chronometer-32px.png")}
            style={dashboardPicStyles.icon}
        />
    );
}

export default AuthPic;