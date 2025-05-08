import { useState, useEffect } from "react";
import { Alert, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { ReturnedAllUserInfo } from "@/com/types";
import { getAllUserInfo } from "@/services/getAllUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useAuthRedirect } from "@/custom-hooks/useAuthRedirect";
import { deleteVanById } from "@/services/deleteVanById";
import { AntDesign } from "@expo/vector-icons";
import { logoutUser } from "@/services/logoutUser";
import { TextInput } from "react-native";

export default function ProfileScreen() {
  useAuthRedirect();
  const [user, setUser] = useState<ReturnedAllUserInfo | null>(null);
  const [isUserEdit, setIsUserEdit] = useState<boolean>(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const userInfo = await getAllUserInfo();
      setUser(userInfo);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleRegisterVanClick = () => {
    try {
      router.push("/(tabs)/profile/register-van");
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/(auth)/login");
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleDeleteVan = (vanId: string, model: string, brand: string) => {
    try {
      return deleteVanById(vanId)
        .then(() => {
          Alert.alert(`Van ${model} ${brand} deleted!`);
        })
        .catch((error) => {
          Alert.alert((error as Error).message);
        })
        .then(() => {
          fetchUser();
        })
        .catch((error) => Alert.alert((error as Error).message));
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        {!isUserEdit ? (
          <>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                setIsUserEdit(true);
              }}
            >
              <Ionicons name="create-outline" size={20} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.name}>
              {user?.name} {user?.lastName}
            </Text>
            <Text style={styles.info}>{user?.email}</Text>
            <Text style={styles.info}>
              {user?.location.city}, {user?.location.country}
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.closeEditIcon}
              onPress={() => {
                setIsUserEdit(false);
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={user?.name}
              onChangeText={(text) => {
                if (!user) return;
                setUser({ ...user, name: text });
              }}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={user?.lastName}
              onChangeText={(text) => {
                if (!user) return;
                setUser({ ...user, lastName: text });
              }}
              placeholder="Last Name"
            />
            <TextInput
              style={styles.input}
              value={user?.email}
              onChangeText={(text) => {
                if (!user) return;
                setUser({ ...user, email: text });
              }}
              placeholder="Email"
            />
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>Your vans</Text>
      {user?.vans.map((van) => (
        <View key={van.id} style={styles.vanCard}>
          <TouchableOpacity
            onPress={() => handleDeleteVan(van.id, van.model, van.brand)}
            style={styles.trashIcon}
          >
            <Ionicons name="trash-outline" size={20} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => {
              router.push(`/(tabs)/profile/edit-van/${van.id}`);
            }}
          >
            <Ionicons name="create-outline" size={20} color="#007AFF" />
          </TouchableOpacity>

          <Text style={styles.vanName}>
            {van.brand} {van.model}
          </Text>
          <Text style={styles.vanInfo}>
            {van.location.city}, {van.location.country}
          </Text>
          <Text style={styles.vanPrice}>{van.price} € / night</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addVanButton}
        onPress={handleRegisterVanClick}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addVanText}>Register a new van</Text>
      </TouchableOpacity>
      {isUserEdit && (
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="checkmark" size={20} color="white" />
          <Text style={styles.saveText}>Accept Changes</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <AntDesign name="poweroff" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  vanCard: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  vanName: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
  },
  vanInfo: {
    fontSize: 15,
    color: "#666",
  },
  vanPrice: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 4,
  },
  addVanButton: {
    marginTop: 24,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addVanText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  trashIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 4,
    zIndex: 1,
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 40,
    padding: 4,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  closeEditIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 4,
    zIndex: 1,
  },
});
