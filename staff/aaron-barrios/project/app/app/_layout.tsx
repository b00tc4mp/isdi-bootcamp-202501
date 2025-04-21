import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useColorScheme } from "@/components/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack, useRouter, Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import "react-native-reanimated"

import { getUserRole } from "@/services/session"

export {
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  initialRouteName: "(screens)",
}

SplashScreen.preventAutoHideAsync()

type Role = "anonym" | "regular" | "mod"

const isValidRole = (value: any): value is Role =>
  value === "anonym" || value === "regular" || value === "mod"

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  const [appReady, setAppReady] = useState(false)
  const [role, setRole] = useState<Role | null>(null)
  const router = useRouter()
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    const prepareApp = async () => {
      const data = await getUserRole()
      const userRole = isValidRole(data?.role) ? data.role : "anonym"
      setRole(userRole)

      const pathname = typeof window !== "undefined" ? window.location.pathname : ""

      if (userRole === "regular" && pathname.startsWith("/(anonym)")) {
        router.replace("/(tabs)")
        return
      }

      if (userRole === "mod" && pathname.startsWith("/(anonym)")) {
        router.replace("/(mod)")
        return
      }

      if (userRole === "anonym" && !pathname.startsWith("/(anonym)")) {
        router.replace("/(anonym)")
        return
      }

      setAppReady(true)
    }

    prepareApp()
  }, [])

  useEffect(() => {
    if (loaded && appReady) {
      SplashScreen.hideAsync()
    }
  }, [loaded, appReady])

  // Este hook NO se puede condicionar. Simplemente renderiza un Slot vacío mientras se carga. (mobile & web compatible)
  if (!loaded || !appReady) {
    return <Slot />
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(anonym)" />
        <Stack.Screen name="(mod)" />
        <Stack.Screen name="(stack)" />
      </Stack>
    </ThemeProvider>
  )
}