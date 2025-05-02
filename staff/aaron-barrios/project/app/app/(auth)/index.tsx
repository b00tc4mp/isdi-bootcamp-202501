import {
  Alert,
  Pressable,
  ImageBackground,
  View,
} from "react-native"
import { useRouter } from "expo-router"
import { Text } from "react-native"
import { authAnonymUser } from "@/services/user/anonym"
import { errors } from "com"

const { SystemError } = errors

import { styles } from "./Landing.styles"

export default function LandingScreen() {
  const router = useRouter()

  const handleAnonymousAccess = () => {
    authAnonymUser()
      .then(() => {
        Alert.alert("👤 Anonym mode", "You have logged as a guest")
        router.replace("/(anonym)" as any)
      })
      .catch(error => {
        console.error(error)
        if (error instanceof SystemError) {
          Alert.alert("⛔ Error", error.message)
        } else {
          Alert.alert("⚠️ Ups...", error.message || "Something went wrong...")
        }
      })
  }

  return (
    <ImageBackground
      source={require("@/assets/images/landing_bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Capa oscura encima del fondo */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>TZEND</Text>
          <Text style={styles.subtitle}>Your only limit is you</Text>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.button} onPress={() => router.push("/(auth)/Login" as any)}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.push("/(auth)/Register" as any)}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </Pressable>

          <Pressable onPress={handleAnonymousAccess}>
            <Text style={styles.guestText}>Enter as a guest</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  )
}
