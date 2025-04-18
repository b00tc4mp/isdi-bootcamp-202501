import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { getRoleFromToken } from "@/data";
import { isUserLoggedIn } from "@/services";
import { useUserStore } from "./stores/userStore";
import { useColorScheme } from "@/components/useColorScheme";
import { Alert } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <App />;
}

function App() {
  const colorScheme = useColorScheme();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await isUserLoggedIn();

        if (loggedIn) {
          const { role } = await getRoleFromToken();
          useUserStore.getState().setRole(role);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
        const err = error as Error;
        Alert.alert(err.message);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!loggedIn ? (
          <Stack.Screen name={"(auth)"} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
