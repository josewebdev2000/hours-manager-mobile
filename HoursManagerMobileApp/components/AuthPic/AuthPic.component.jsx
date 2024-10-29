/**
 * Hours Manager Clock Symbol for Authentication Screens
 */
import { Image } from "react-native";

import authPicStyles from "./AuthPic.style";

function AuthPic()
{
    return (
        <Image
            source={require("../../assets/chronometer-32px.png")}
            style={authPicStyles.pic}
        />
    );
}

export default AuthPic;