import { StyleSheet } from "react-native"
import { Button } from "react-native"

import { Text, View } from "@/components/Themed"

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landing</Text>
      <View style={styles.container}>
        <View style={styles.button}>
          <Button title="LOG IN" /*onPress={() => navigation.navigate('Login', { alias: '', password: '' }) }*/ />
        </View>
        <Button title="REGISTER" /*onPress={() => navigation.navigate('Register', { alias: '', email: '', password: '' })} */ />
      </View>
    </View>
  );
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
  }
})
