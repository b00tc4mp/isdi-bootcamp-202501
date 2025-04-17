import { useState } from "react";
import { TextInput, StyleSheet, Button, Alert } from "react-native";
import { useRouter } from "expo-router";

import { Text, View } from "react-native";
import registerUser from "@/services/registerUser";

export default function Register() {
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const handleRegister = async () => {
  //   try {
  //     await registerUser(alias, email, password);
  //     Alert.alert("✅ Registro exitoso", "Ya puedes iniciar sesión");
  //     // router.replace('/home'); // o a la ruta que quieras tras login
  //   } catch (error: any) {
  //     Alert.alert("❌ Error", error.message || "Ha ocurrido un error");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>

      <TextInput
        placeholder="ALIAS"
        onChangeText={setAlias}
        value={alias}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="EMAIL"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="PASSWORD"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <Button title="REGISTER" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
