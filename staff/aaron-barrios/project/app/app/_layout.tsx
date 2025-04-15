import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/components/useColorScheme"
import { useSession } from "@/hooks/useSession"

export {
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  initialRouteName: "(screens)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return <AppNavigator />
}

function AppNavigator() {
  const colorScheme = useColorScheme()
  const { isAuthenticated, loading } = useSession()

  if (loading) return null // O un spinner si prefieres

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={isAuthenticated ? "(tabs)" : "(auth)"} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  )
}
