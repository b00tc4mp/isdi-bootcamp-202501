import { Alert, Button, StyleSheet, Pressable } from "react-native"
import { useRouter } from "expo-router"

import { Text, View } from "@/components/Themed"

import { authAnonymUser } from "@/services/user/anonym"
import { errors } from "com"

const { SystemError } = errors

export default function LandingScreen() {
  const router = useRouter()

  const handleAnonymousAccess = () => {
    authAnonymUser()
      .then(() => {
        Alert.alert("👤 Anonym mode", "You have logged as a guest")
        router.replace("/(anonym)" as any) // 🚀 redirige a tu layout anónimo
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
    <View style={styles.container}>
      <Text style={styles.title}>Landing</Text>
      <View style={styles.container}>

        <View style={styles.button}>
          <Button title="LOG IN" onPress={() => router.push("/(auth)/Login" as any)} />
        </View>
        <Button title="REGISTER" onPress={() => router.push("/(auth)/Register" as any)} />

        {/* Anchor a modo Anónimo */}
        <Pressable onPress={handleAnonymousAccess}>
          <Text style={styles.link}>Enter as a guest</Text>
        </Pressable>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f0f0f0"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 12
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginBottom: 16
  },
  link: {
    fontSize: 16,
    color: "#007aff",
    textDecorationLine: "underline",
    marginTop: 12
  }
})
