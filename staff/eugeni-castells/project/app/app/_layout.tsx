import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { isUserLoggedIn } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "@/components/Loading";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [appReady, setAppReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        const hasSeenLanding = await AsyncStorage.getItem("hasSeenLanding");

        if (loggedIn) {
          const lastRoute = await AsyncStorage.getItem("lastRoute");
          if (lastRoute && lastRoute !== "(auth)" && lastRoute !== "modal") {
            setInitialRoute("/" + lastRoute);
          } else {
            setInitialRoute("/(tabs)");
          }
        } else {
          if (hasSeenLanding === "true") {
            setInitialRoute("/(tabs)");
          } else {
            setInitialRoute("/(auth)");
          }
        }
      } catch (e) {
        console.warn("Error validant sessió:", e);
        setInitialRoute("/(auth)");
      } finally {
        setAppReady(true);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (loaded && appReady && initialRoute) {
      SplashScreen.hideAsync();
      router.replace(initialRoute as any);
    }
  }, [loaded, appReady, initialRoute]);

  const showApp = loaded && appReady && initialRoute;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {showApp && (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      )}
      {!showApp && <Loading isLoading={false} size="large" />}
    </ThemeProvider>
  );
}
