import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { registerUser } from "../../services";
import { useRouter } from "expo-router";

export const register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/(auth)/login");
  };

  const handleSubmit = () => {
    try {
      const newUserInfo = {
        name,
        lastName,
        email,
        country,
        city,
        address,
        password,
      };

      return registerUser(newUserInfo).catch((error) => {
        console.error(error);

        const err = error as Error;

        Alert.alert(err.message);
      });
    } catch (error) {
      console.error(error);

      const err = error as Error;

      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastname}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <TextInput placeholder="City" value={city} onChangeText={setCity} />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Register" onPress={handleSubmit} />
        <Button title="Login" onPress={handleLoginClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export default register;
