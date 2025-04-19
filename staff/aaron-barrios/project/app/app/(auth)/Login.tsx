import { useState } from "react"
import { TextInput, StyleSheet, Button, Alert, Pressable } from "react-native"
import { Text, View } from "@/components/Themed"
import { useRouter } from "expo-router"

import { loginUser } from "@/services/session"
import { authAnonymUser } from "@/services/user/anonym"
import { errors } from "com"

const { SystemError, ValidationError } = errors

export default function Login() {
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    try {
      loginUser(alias, password)
        .then(token => {
          // console.log("🎉 Token guardado:", token)

          setAlias('')
          setPassword('')

          Alert.alert('Welcome back!', `Welcome back! ${alias}`)
          router.replace('/(tabs)' as any)
        })
        .catch(error => {
          console.error(error)

          if (error instanceof SystemError)
            Alert.alert('⛔', error.message)
          else
            Alert.alert('⚠️ Error inesperado', error.message || 'Ups...')
        })

    } catch (error) {
      console.error(error)

      if (error instanceof ValidationError)
        Alert.alert('❌ Validación', error.message)
      else
        Alert.alert('⛔ Error fatal', error instanceof Error ? error.message : 'Algo salió mal')
    }
  }

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
    <View style={styles.container2}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.container}>
        <TextInput
          placeholder="ALIAS"
          onChangeText={setAlias}
          value={alias}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="PASSWORD"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.button}>
          <Button title="LOG IN" onPress={handleLogin} />
        </View>

        <Button title="Register" onPress={() => router.push("/(auth)/Register" as any)} />

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
  container2: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f0"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 12
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff"
  },
  link: {
    fontSize: 16,
    color: "#007aff",
    textDecorationLine: "underline",
    marginTop: 12
  },
  button: {
    marginBottom: 16
  },
})
