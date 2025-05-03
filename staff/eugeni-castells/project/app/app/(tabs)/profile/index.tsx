import { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { ReturnedAllUserInfo } from "@/com/types";
import { getAllUserInfo } from "@/services/getAllUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
export default function ProfileScreen() {
  const [user, setUser] = useState<ReturnedAllUserInfo | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        debugger;
        const userInfo = await getAllUserInfo();
        setUser(userInfo);
      } catch (error) {
        Alert.alert((error as Error).message);
      }
    };

    fetchUser();
  }, []);

  const handleRegisterVanClick = () => {
    try {
      router.push("/(tabs)/profile/RegisterVan");
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <Text>
          {user?.name} {user?.lastName}
        </Text>
        <Text>{user?.email}</Text>
        <Text>{user?.location.city}</Text>
        <Text>{user?.location.country}</Text>
        {user?.vans.map((van) => {
          return (
            <>
              <Text>
                {van.model} {van.brand}
              </Text>
              <Text>{van.location.city}</Text>
              <Text>{van.location.country}</Text>
              <Text>{van.price} </Text>
            </>
          );
        })}
        <Ionicons
          name="add-circle-outline"
          size={24}
          color="black"
          onPress={() => {
            handleRegisterVanClick();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
