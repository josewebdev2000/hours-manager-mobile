import React, { useState, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

// Add Gesture Handler
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import app theme
import { Provider } from "@ant-design/react-native";
import { ThemeProvider } from "@ant-design/react-native/lib/style";
import theme from "./config/theme.config";

// Import Font Loading Config
import loadFonts from "./config/fontLoad.config";

// Import Context Providers
import { UserContextProvider } from "./contexts/User/User.context";
import { PasswordTokenContextProvider } from "./contexts/PasswordToken/PasswordToken.context";

// Import the AppNavigator of the App
import AppNavigator from "./navigators/AppNavigator/AppNavigator.navigator";

// Prevent Splash Screen from Auto-Hiding
SplashScreen.preventAutoHideAsync();

function App()
{
  // Control whether App is ready for the user or not
  const [ isReady, setIsReady ] = useState(false);

  // Side Effect to load stuff
  useEffect(() => {
    async function prepareApp()
    {
      try
      {
        await loadFonts();
      }

      catch (e)
      {
        console.warn(e);
      }

      finally
      {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  if (!isReady)
  {
    return null; // Keep Splash Screen
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider theme={theme}>
          <Provider>
            <UserContextProvider>
              <PasswordTokenContextProvider>
                <AppNavigator />
              </PasswordTokenContextProvider>
            </UserContextProvider>
          </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );

}

export default App;
