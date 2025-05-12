import { useState } from "react";
import {
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@/components/Themed";
import * as ImagePicker from "expo-image-picker";
import { ExpoImagePickerAsset, VehicleFeatures, VehicleTraits } from "./types";
import { generateRandomId } from "@/app/utils";
import CustomCheckBox from "@/components/CustomCheckBox";
import { registerVan } from "@/services";
import { spacing } from "@/constants/Paddings";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Loading } from "@/components/Loading";

const vehicleTraitsDefault: VehicleTraits = {
  accessible: false,
  bedCount: "1",
  doors: "3",
  fuelType: "diesel",
  maxTravellers: "2",
  storage: "5",
  windows: "3",
};

const vehicleFeaturesDefault: VehicleFeatures = {
  heating: false,
  airConditioning: false,
  insideKitchen: true,
  fridge: true,
  toilet: "none",
  shower: false,
};

const RegisterVan = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleTraits, setVehicleTraits] =
    useState<VehicleTraits>(vehicleTraitsDefault);
  const [vehicleFeatures, setVehicleFeatures] = useState<VehicleFeatures>(
    vehicleFeaturesDefault
  );
  const [images, setImages] = useState<ExpoImagePickerAsset[]>([]);

  const handleRegisterClick = async () => {
    setIsLoading(true);
    try {
      const vanInfo = {
        model,
        brand,
        price: parseInt(price),
        description,
        features: vehicleFeatures,
        traits: {
          ...vehicleTraits,
          doors: parseInt(vehicleTraits.doors),
          bedCount: parseInt(vehicleTraits.bedCount),
          windows: parseInt(vehicleTraits.windows),
          maxTravellers: parseInt(vehicleTraits.maxTravellers),
          storage: parseInt(vehicleTraits.storage),
        },
        images,
      };
      await registerVan(vanInfo);
      Alert.alert("Van registered!");
      router.push("/(tabs)/profile");
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setIsLoading(false);
      console.log("finally entered");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const newImage = {
        id: generateRandomId(),
        uri: result.assets[0].uri,
      };
      setImages((prev) => [...prev, newImage]);
    }
  };

  const handleDeleteClick = (imageId: string) => {
    setImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  return isLoading ? (
    <Loading isLoading={isLoading} size="large" />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text style={styles.title}>Register a Van</Text>

      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per night (€)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.sectionTitle}>Vehicle characteristics</Text>
      <View style={styles.row}>
        <CustomCheckBox
          value={vehicleTraits.accessible}
          onToggle={() =>
            setVehicleTraits({
              ...vehicleTraits,
              accessible: !vehicleTraits.accessible,
            })
          }
        />
        <Text style={styles.label}>Accessible</Text>
      </View>
      {(["bedCount", "doors", "windows", "maxTravellers"] as const).map(
        (field) => (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field}
            value={vehicleTraits[field]}
            onChangeText={(text) =>
              setVehicleTraits({ ...vehicleTraits, [field]: text })
            }
          />
        )
      )}

      <Text style={styles.sectionTitle}>Equipment</Text>
      {["heating", "airConditioning", "insideKitchen", "fridge", "shower"].map(
        (f) => (
          <View key={f} style={styles.row}>
            <CustomCheckBox
              value={
                vehicleFeatures[f as keyof typeof vehicleFeatures] as boolean
              }
              onToggle={() =>
                setVehicleFeatures({
                  ...vehicleFeatures,
                  [f]: !vehicleFeatures[f as keyof typeof vehicleFeatures],
                })
              }
            />
            <Text style={styles.label}>{f}</Text>
          </View>
        )
      )}

      <Text style={styles.sectionTitle}>Lavabo</Text>
      <View style={styles.optionsRow}>
        {(["fixed", "portable", "none"] as const).map((type) => (
          <Pressable
            key={type}
            onPress={() =>
              setVehicleFeatures({ ...vehicleFeatures, toilet: type })
            }
          >
            <Text
              style={[
                styles.optionButton,
                vehicleFeatures.toilet === type && styles.optionButtonSelected,
              ]}
            >
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Fuel</Text>
      <View style={styles.optionsRow}>
        {(["petrol", "diesel", "electric", "hybrid"] as const).map((type) => (
          <Pressable
            key={type}
            onPress={() =>
              setVehicleTraits({ ...vehicleTraits, fuelType: type })
            }
          >
            <Text
              style={[
                styles.optionButton,
                vehicleTraits.fuelType === type && styles.optionButtonSelected,
              ]}
            >
              {type}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick images</Text>
      </Pressable>

      <ScrollView horizontal style={{ marginVertical: spacing.md }}>
        {images.map((image) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              onPress={() => handleDeleteClick(image.id)}
            />
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.submitButton} onPress={handleRegisterClick}>
        <Text style={styles.submitText}>Register</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    marginLeft: spacing.sm,
    fontSize: 14,
  },
  optionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  optionButton: {
    backgroundColor: "#eee",
    padding: spacing.sm,
    borderRadius: 999,
    fontSize: 14,
  },
  optionButtonSelected: {
    backgroundColor: "black",
    color: "white",
    borderColor: "#007AFF",
  },
  imageButton: {
    backgroundColor: "#007AFF",
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: spacing.md,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  imageContainer: {
    marginRight: spacing.md,
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default RegisterVan;
