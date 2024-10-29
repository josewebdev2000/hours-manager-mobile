// Import Expo Fonts Dependencies
import * as Font from "expo-font";

// Export load fonts func
export default async function loadFonts()
{
    await Font.loadAsync({
        "antoutline": require("@ant-design/icons-react-native/fonts/antoutline.ttf")
    });
}