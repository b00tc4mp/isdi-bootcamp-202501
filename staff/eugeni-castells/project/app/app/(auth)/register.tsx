import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import {
  checkLocationPermit,
  registerUser,
  getRealTimeLocation,
} from "@/services";
import * as Location from "expo-location";
import { ImageBackground } from "react-native";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/Themed";
import { Typography } from "@/constants/Typography";
import {
  GeoDBCountry,
  GeoDBCountryResponse,
  GeoDBResponse,
  GeoDBResponseCity,
} from "@/services/types";
import { validate } from "@/com";
import { filterCountries } from "@/services/filterCountries";
import { filterCitiesInCountry } from "@/services/filterCitiesInCountry";

export const register = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [countryQuery, setCountryQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<GeoDBCountry | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<GeoDBResponseCity | null>(
    null
  );
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedCountryQuery, setDebouncedCountryQuery] = useState("");

  const [countries, setCountries] = useState<GeoDBCountryResponse>();
  const [cities, setCities] = useState<GeoDBResponse>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(cityQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [cityQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCountryQuery(countryQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [countryQuery]);

  const fetchCities = () => {
    if (!selectedCountry || !debouncedQuery) return;

    try {
      validate.string(cityQuery, "location search");

      return filterCitiesInCountry(cityQuery, selectedCountry!.code)
        .catch((error) => {
          Alert.alert(error.message);
        })
        .then((cities) => {
          setCities(cities!);
        });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const fetchCountries = () => {
    try {
      validate.string(countryQuery, "location search");

      return filterCountries(countryQuery)
        .catch((error) => {
          Alert.alert(error.message);
        })
        .then((countries) => {
          setCountries(countries!);
        });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    if (debouncedQuery && selectedCountry) {
      fetchCities();
    } else if (!selectedCountry) {
      Alert.alert("You have to select a country first!");
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedCountryQuery) {
      fetchCountries();
    }
  }, [debouncedCountryQuery]);

  const handleLoginClick = () => {
    router.push("/(auth)/login");
  };

  const handleSubmit = async () => {
    let permission;
    let coordinates;
    try {
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
          setPermissionGranted(true);
        } catch (error) {
          const err = error as Error;

          Alert.alert(err.message);
          return;
        }
      } else {
        setPermissionGranted(false);
      }
      let newUserInfo;
      if (permissionGranted) {
        newUserInfo = {
          name,
          lastName,
          email,
          // country: selectedCountry!.name,
          // city: selectedCity!.city,
          address,
          password,
          coordinates: [coordinates!.longitude, coordinates!.latitude] as [
            number,
            number
          ],
        };
      } else {
        newUserInfo = {
          name,
          lastName,
          email,
          country: selectedCountry!.name,
          city: selectedCity!.city,
          address,
          password,
          coordinates: [coordinates!.longitude, coordinates!.latitude] as [
            number,
            number
          ],
        };
      }

      try {
        await registerUser(newUserInfo);
        Alert.alert("User registered!");
        router.push("/(auth)/login");
      } catch (error) {
        console.error(error);
        const err = error as Error;

        Alert.alert(err.message);
      }
    } catch (error) {
      console.error(error);
      const err = error as Error;

      Alert.alert(err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/register.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={Colors.light.buttonText}
          style={styles.input}
        />
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastname}
          placeholderTextColor={Colors.light.buttonText}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={Colors.light.buttonText}
          style={styles.input}
        />
        {!permissionGranted && (
          <>
            <TextInput
              placeholder="Country"
              value={countryQuery}
              onChangeText={setCountryQuery}
              placeholderTextColor={Colors.light.buttonText}
              style={styles.input}
            />
            {!selectedCountry &&
              countries?.data.map((c) => (
                <TouchableOpacity
                  key={c.code}
                  onPress={() => {
                    setSelectedCountry(c);
                    setCountryQuery(c.name);
                  }}
                >
                  <Text style={{ color: "white" }}>{c.name}</Text>
                </TouchableOpacity>
              ))}
            <TextInput
              placeholder="City"
              value={cityQuery}
              onChangeText={setCityQuery}
              placeholderTextColor={Colors.light.buttonText}
              style={styles.input}
            />
            {!selectedCity &&
              cities?.data.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => {
                    setSelectedCity(c);
                    setCityQuery(c.city);
                  }}
                >
                  <Text style={{ color: "white" }}>{c.city}</Text>
                </TouchableOpacity>
              ))}
          </>
        )}
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor={Colors.light.buttonText}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor={Colors.light.buttonText}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLoginClick}
          style={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>
            You already have an account? Go to Login
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  content: {
    zIndex: 2,
    gap: spacing.md,
  },
  field: {
    gap: spacing.md,
  },
  label: {
    fontWeight: "bold",
    color: Colors.light.buttonText,
  },
  input: {
    borderWidth: 2,
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
    fontWeight: Typography.fontWeight.bolder,
  },
});

export default register;
