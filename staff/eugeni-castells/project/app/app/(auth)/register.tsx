import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  checkLocationPermit,
  registerUser,
  getRealTimeLocation,
} from "@/services";
import * as Location from "expo-location";

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

  const handleSubmit = async () => {
    let permission;
    let coordinates;

    try {
      permission = await checkLocationPermit();
    } catch (error) {
      const err = error as Error;

      Alert.alert(err.message);
    }

    if (!permission!.granted) {
      try {
        permission = await Location.requestForegroundPermissionsAsync();
      } catch (error) {
        const err = error as Error;

        Alert.alert(err.message);
      }
    }

    if (permission?.status === "granted") {
      try {
        coordinates = await getRealTimeLocation();
      } catch (error) {
        const err = error as Error;

        Alert.alert(err.message);
        return;
      }
    }

    const newUserInfo = {
      name,
      lastName,
      email,
      country,
      city,
      address,
      password,
      coordinates: [coordinates!.latitude, coordinates!.longitude] as [
        number,
        number
      ],
      // coordinates,
    };

    try {
      await registerUser(newUserInfo);
    } catch (error) {
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
