import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/components/useColorScheme"
import { getAuthenticationData } from "@/utils/getAuthenticationData"
import { data } from "@/data"

export {
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  initialRouteName: "(screens)",
}

// Evita que el splash screen desaparezca antes de cargar
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
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAuthenticationData()
      .then(data => {
        setRole(data?.role ?? null)
      })
      .finally(() => setLoading(false))

    data.getToken().then(token => {
      console.log("🔐 Token actual:", token)
    })
  }, [])

  if (loading) return null

  let screenName: string

  if (!role) {
    screenName = "(auth)"
  } else if (role === "anonym") {
    screenName = "(anon)"
  } else if (role === "moderator") {
    screenName = "(mod)"
  } else {
    screenName = "(tabs)"
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenName} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  )
}