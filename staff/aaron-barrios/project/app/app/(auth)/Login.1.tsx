import { TextInput, StyleSheet } from "react-native"
import { Button } from "react-native"

import { Text, View } from "@/components/Themed"

export default function Logiin() {
  return (
    <View style={styles.container2}>
      <Text style={styles.title}>LOGIN</Text>

      <View style={styles.container}>


        <TextInput
          placeholder="ALIAS"
          // onChangeText={setAlias}
          // value={alias}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="PASSWORD"
          // onChangeText={setPassword}
          // value={password}
          secureTextEntry
          style={styles.input}
        />

        <Button title="LOG IN" />
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
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
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "center"
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
    color: "blue",
    marginTop: 8,
    textAlign: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  }
})
