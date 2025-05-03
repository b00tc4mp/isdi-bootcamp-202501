import { useState } from "react"
import { TextInput, Alert, Pressable, View, Text } from "react-native"
import { useRouter } from "expo-router"

import { registerUser } from "@/services/user"
import { authAnonymUser } from "@/services/user/anonym"
import { errors } from "com"

import { styles } from "../../styles/register"

const { SystemError, ValidationError } = errors

export default function Register() {
  const [alias, setAlias] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = () => {
    try {
      registerUser(alias, email, password)
        .then(() => {
          setAlias("")
          setEmail("")
          setPassword("")

          Alert.alert("✅ Registro exitoso", "Ya puedes iniciar sesión")
          router.replace("/(auth)/Login" as any)
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
    <View style={styles.screen}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Tzend</Text> */}
        <Text style={styles.title}>Register</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Alias</Text>
        <TextInput
          placeholder="Enter your alias"
          onChangeText={setAlias}
          value={alias}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/Login")}>
          <Text style={styles.secondaryText}>
            Already have an account? <Text style={styles.bold}>Log in here</Text>
          </Text>
        </Pressable>

        <Pressable onPress={handleAnonymousAccess}>
          <Text style={styles.link}>Enter as a guest</Text>
        </Pressable>
      </View>
    </View>
  )
}

Register.displayName = "Register"