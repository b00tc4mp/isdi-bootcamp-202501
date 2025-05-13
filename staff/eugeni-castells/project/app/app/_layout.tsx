import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
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

  const pathname = usePathname();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        const hasSeenLanding = await AsyncStorage.getItem("hasSeenLanding");

        if (loggedIn) {
          const lastRoute = await AsyncStorage.getItem("lastRoute");
          setInitialRoute(
            lastRoute && lastRoute !== "(auth)" && lastRoute !== "modal"
              ? "/" + lastRoute
              : "/(tabs)"
          );
        } else {
          if (pathname?.startsWith("/(auth)")) {
            setInitialRoute(pathname);
          } else if (hasSeenLanding === "true") {
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
    console.log("pathname actual:", pathname);
    console.log("initialRoute a aplicar:", initialRoute);
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
          {initialRoute?.startsWith("/(auth)") && (
            <Stack.Screen name="(auth)" />
          )}
          {initialRoute?.startsWith("/(tabs)") && (
            <Stack.Screen name="(tabs)" />
          )}
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      )}
      {!showApp && <Loading isLoading={false} size="large" />}
    </ThemeProvider>
  );
}
