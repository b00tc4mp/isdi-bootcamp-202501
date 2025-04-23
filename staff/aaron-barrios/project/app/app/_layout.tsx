import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useColorScheme } from "@/components/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack, useRouter, Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import { Platform } from "react-native"
import "react-native-reanimated"

import { getUserRole } from "@/services/user"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
  initialRouteName: "(screens)",
}

SplashScreen.preventAutoHideAsync()

type Role = "anonym" | "regular" | "mod"

const isValidRole = (value: any): value is Role =>
  value === "anonym" || value === "regular" || value === "mod"

// ...imports igual que antes...

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  const [appReady, setAppReady] = useState(false)
  const [initialRoute, setInitialRoute] = useState<string | null>(null)
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

      if (Platform.OS !== "web") {
        if (userRole === "regular") setInitialRoute("/(tabs)")
        else if (userRole === "mod") setInitialRoute("/(mod)")
        else setInitialRoute("/(anonym)")
      } else {
        const pathname = typeof window !== "undefined" ? window.location.pathname : ""

        if (Platform.OS === "web") {
          requestAnimationFrame(() => {
            if (userRole === "regular" && pathname.startsWith("/(anonym)")) {
              router.replace("/(tabs)")
            } else if (userRole === "mod" && pathname.startsWith("/(anonym)")) {
              router.replace("/(mod)")
            } else if (userRole === "anonym" && !pathname.startsWith("/(anonym)")) {
              router.replace("/(anonym)")
            }
          })
        }
      }

      setAppReady(true)
    }

    prepareApp()
  }, [])

  useEffect(() => {
    if (loaded && appReady && initialRoute) {
      SplashScreen.hideAsync()
      router.replace(initialRoute as any)
    }
  }, [loaded, appReady, initialRoute])

  if (!loaded || !appReady) {
    return null
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