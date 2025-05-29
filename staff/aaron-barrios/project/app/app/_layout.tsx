import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useColorScheme } from "@/components/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import {
  useFonts,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat"
import { Lato_300Light } from "@expo-google-fonts/lato"
import { Stack, useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import { ActivityIndicator, Platform, Text, View } from "react-native"
import "react-native-reanimated"

import { getUserRole } from "@/services/user"

export { ErrorBoundary } from "expo-router"

const SESSION_LANDING_SEEN = "sessionLandingSeen"

export const unstable_settings = {
  initialRouteName: "(screens)",
}

SplashScreen.preventAutoHideAsync()

type Role = "anonym" | "regular" | "mod"

const isValidRole = (value: any): value is Role =>
  value === "anonym" || value === "regular" || value === "mod"

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_900Black,
    Lato_300Light,
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  const [appReady, setAppReady] = useState(false)
  const [initialRoute, setInitialRoute] = useState<string | null>(null)
  const router = useRouter()
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    const prepareApp = async () => {
      const data = await getUserRole()
      const userRole = isValidRole(data?.role) ? data.role : null

      const isWeb = Platform.OS === "web"

      const pathname = isWeb ? window?.location?.pathname ?? "" : ""
      const hasSeenLanding = isWeb ? sessionStorage.getItem(SESSION_LANDING_SEEN) === "true" : false

      console.log("📍 PATH:", pathname)
      console.log("👀 HAS SEEN LANDING:", hasSeenLanding)
      console.log("🧑 ROLE:", userRole)

      // 🌟 Solo mostramos landing si está en raíz y no ha visto landing aún
      if (isWeb && pathname === "/" && !hasSeenLanding) {
        sessionStorage.setItem(SESSION_LANDING_SEEN, "true")
        setInitialRoute("/(auth)")
        setAppReady(true)
        return
      }

      // // ✅ Mobile → redirige directo según rol
      // if (Platform.OS !== "web") {
      //   if (userRole === "regular") setInitialRoute("/(tabs)")
      //   else if (userRole === "mod") setInitialRoute("/(mod)")
      // else setInitialRoute("/(anonym)")
      //   setAppReady(true)
      //   return
      // }

      // ✅ Mobile → redirige directo según rol
      if (Platform.OS !== "web") {
        if (userRole === "regular") setInitialRoute("/(tabs)")
        else if (userRole === "mod") setInitialRoute("/(mod)")
        else if (userRole === "anonym") setInitialRoute("/(anonym)")
        else setInitialRoute("/(auth)") // ← aquí está la clave
        setAppReady(true)
        return
      }


      // ✅ En web → corregimos incoherencias entre rol y ruta
      requestAnimationFrame(() => {
        if (userRole === "regular" && pathname.startsWith("/(anonym)")) {
          router.replace("/(tabs)")
        } else if (userRole === "mod" && pathname.startsWith("/(anonym)")) {
          router.replace("/(mod)")
        } else if (userRole === "anonym" && !pathname.startsWith("/(anonym)")) {
          router.replace("/(anonym)")
        }
      })

      // ✅ Si estás en Login/Register → mantenemos ruta tras F5
      if (pathname.startsWith("/(auth)")) {
        setInitialRoute(pathname)
      } else if (userRole === "regular") {
        setInitialRoute("/(tabs)")
      } else if (userRole === "mod") {
        setInitialRoute("/(mod)")
      } else if (userRole === "anonym") {
        setInitialRoute("/(anonym)")
      } else {
        setInitialRoute("/(auth)/Login")
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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }}>
        <ActivityIndicator size="large" color="#facc15" />
        <Text style={{ color: "#aaa", marginTop: 10 }}>Loading...</Text>
      </View>
    )
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