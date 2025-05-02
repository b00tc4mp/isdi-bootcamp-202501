import { useState } from "react"
import {
  TextInput,
  Alert,
  Pressable,
  View,
  Text,
} from "react-native"
import { useRouter } from "expo-router"

import { loginUser, getUserRole } from "@/services/user"
import { authAnonymUser } from "@/services/user/anonym"
import { errors } from "com"

const { SystemError, ValidationError } = errors

import { styles } from "./Login.styles"

export default function Login() {
  const [alias, setAlias] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    try {
      loginUser(alias, password)
        .then(() => getUserRole())
        .then((data) => {
          setAlias("")
          setPassword("")

          const role = data?.role
          if (role === "mod") router.replace("/(mod)")
          else if (role === "regular") router.replace("/(tabs)")
          else router.replace("/(anonym)")

          Alert.alert("Welcome back!", `Welcome back! ${alias}`)
        })
        .catch((error) => {
          console.error(error)
          if (error instanceof SystemError)
            Alert.alert("⛔", error.message)
          else
            Alert.alert("⚠️ Error inesperado", error.message || "Ups...")
        })
    } catch (error) {
      console.error(error)
      if (error instanceof ValidationError)
        Alert.alert("❌ Validación", error.message)
      else
        Alert.alert("⛔ Error fatal", error instanceof Error ? error.message : "Algo salió mal")
    }
  }

  const handleAnonymousAccess = () => {
    authAnonymUser()
      .then(() => {
        Alert.alert("👤 Anonym mode", "You have logged as a guest")
        router.replace("/(anonym)" as any)
      })
      .catch((error) => {
        console.error(error)
        if (error instanceof SystemError) {
          Alert.alert("⛔ Error", error.message)
        } else {
          Alert.alert("⚠️ Ups...", error.message || "Something went wrong...")
        }
      })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tzend</Text>
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your alias"
          onChangeText={setAlias}
          value={alias}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable onPress={handleAnonymousAccess}>
          <Text style={styles.link}>Enter as a guest</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/Register")}>
          <Text style={styles.secondaryText}>
            ¿Do not have an account? <Text style={styles.bold}>Register here</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}