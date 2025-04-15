import { useState } from "react"
import { TextInput, StyleSheet, Button, Alert } from "react-native"
import { Text, View } from "@/components/Themed"
import { useRouter } from "expo-router"

import loginUser from "@/services/loginUser"
import { errors } from 'com'

const { SystemError, ValidationError } = errors

export default function Login() {
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    try {
      // Lógica asíncrona
      loginUser(alias, password)
        .then(() => {
          setAlias('');
          setPassword('');

          Alert.alert('Welcome back!', `Welcome back! ${alias}`);
          router.replace('/(auth)/Home' as any)
        })
        .catch((error) => {
          console.error(error);

          if (error instanceof SystemError)
            Alert.alert('⛔', error.message);
          else
            Alert.alert('⚠️ Error inesperado', error.message || 'Ups...');
        });
    } catch (error) {
      console.error(error);

      if (error instanceof ValidationError)
        Alert.alert('❌ Validación', error.message);
      else
        Alert.alert('⛔ Error fatal', error instanceof Error ? error.message : 'Algo salió mal');
    }
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
        <Button title="LOG IN" onPress={handleLogin} />
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
  }
})
