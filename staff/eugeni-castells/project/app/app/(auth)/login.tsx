import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/services";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  const handleLogIn = () => {
    try {
      return loginUser(email, password)
        .then(() => {
          router.replace("/(tabs)");
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } catch (error) {
      console.error(error);

      const err = error as Error;

      Alert.alert(err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="correu@exemple.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Colors.light.buttonText}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={Colors.light.buttonText}
          />
        </View>
        <TouchableOpacity onPress={handleLogIn} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>Don't have an account yet?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 20,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  content: {
    zIndex: 2,
    gap: spacing.lg,
  },
  field: {
    gap: spacing.md,
  },
  label: {
    fontWeight: "bold",
    color: Colors.light.buttonText,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.buttonText,
    borderRadius: 6,
    padding: 10,
    color: Colors.light.buttonText,
  },
  button: {
    backgroundColor: Colors.light.button,
    padding: spacing.xsmd,
    borderRadius: 10,
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: Colors.light.buttonText,
    textAlign: "center",
  },
});
