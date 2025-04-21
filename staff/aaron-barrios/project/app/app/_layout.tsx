import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useColorScheme } from "@/components/useColorScheme"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack, useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import "react-native-reanimated"
import { ColorSchemeName } from "react-native"

import { getUserRole } from "@/services/session"

export {
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  initialRouteName: "(screens)",
}

// Evita que el splash screen desaparezca antes de cargar
SplashScreen.preventAutoHideAsync()

// Roles permitidos
type Role = "anonym" | "regular" | "mod"

// Type guard para validar el rol
const isValidRole = (value: any): value is Role => {
  return value === "anonym" || value === "regular" || value === "mod"
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  const [appReady, setAppReady] = useState(false)
  const [role, setRole] = useState<Role | null>(null)
  const router = useRouter()

  // Lanza si hay error cargando fuentes
  useEffect(() => {
    if (error) throw error
  }, [error])

  // Recupera el rol del usuario y redirige si es necesario
  useEffect(() => {
    const prepareApp = async () => {
      const data = await getUserRole()
      const userRole = isValidRole(data?.role) ? data.role : "anonym"
      setRole(userRole)

      const pathname = location.pathname

      if (userRole === "regular" && pathname.startsWith("/(anonym)")) {
        router.replace("/(tabs)" as any)
        return
      }

      if (userRole === "mod" && pathname.startsWith("/(anonym)")) {
        router.replace("/(mod)" as any)
        return
      }

      if (userRole === "anonym" && !pathname.startsWith("/(anonym)")) {
        router.replace("/(anonym)" as any)
        return
      }

      setAppReady(true)
    }

    prepareApp()
  }, [])

  // Oculta el splash screen cuando esté todo listo
  useEffect(() => {
    if (loaded && appReady) {
      SplashScreen.hideAsync()
    }
  }, [loaded, appReady])

  if (!loaded || !appReady) return null

  return <AppNavigator colorScheme={useColorScheme()} />
}

function AppNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
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