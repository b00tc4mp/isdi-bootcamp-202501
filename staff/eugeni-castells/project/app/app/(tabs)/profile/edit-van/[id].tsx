import { useEffect, useState } from "react";
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
import { EditableImage, VehicleFeatures, VehicleTraits } from "../types";
import { generateRandomId } from "@/app/utils";
import CustomCheckBox from "@/components/CustomCheckBox";
import { spacing } from "@/constants/Paddings";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { getVanById } from "@/services/getVanById";
import { Loading } from "@/components/Loading";
import { updateVanData } from "@/services/updateVanData";
import { UpdateVanParam } from "@/services/types";

const EditVan = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [originalVan, setOriginalVan] = useState<{
    model: string;
    brand: string;
    description: string;
    price: string;
    features: VehicleFeatures;
    traits: VehicleTraits;
    images: EditableImage[];
  }>();
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleTraits, setVehicleTraits] = useState<VehicleTraits>();
  const [vehicleFeatures, setVehicleFeatures] = useState<VehicleFeatures>();
  const [images, setImages] = useState<EditableImage[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchVan = async () => {
      try {
        const van = await getVanById(id as string);
        setModel(van.model);
        setBrand(van.brand);
        setDescription(van.description);
        setPrice(van.price.toString());
        const features = {
          heating: van.features.heating,
          shower: van.features.shower,
          airConditioning: van.features.airConditioning,
          insideKitchen: van.features.insideKitchen,
          toilet: van.features.toilet,
          fridge: van.fridge,
        };

        setVehicleFeatures(features);
        const traits = {
          accessible: van.vehicleTraits.accessible,
          doors: van.vehicleTraits.doors.toString(),
          bedCount: van.vehicleTraits.bedCount.toString(),
          storage: van.vehicleTraits.storage.toString(),
          fuelType: van.vehicleTraits.fuelType,
          windows: van.vehicleTraits.windows.toString(),
          maxTravellers: van.vehicleTraits.maxTravellers.toString(),
        };
        setVehicleTraits(traits);

        const imagesFromServer = van.images.map((image) => ({
          id: generateRandomId(),
          uri: image.url,
          isLocal: false,
          path: image.path,
        }));
        setImages(imagesFromServer);

        setOriginalVan({
          model: van.model,
          brand: van.brand,
          description: van.description,
          price: van.price.toString(),
          features: features,
          traits: traits,
          images: imagesFromServer,
        });
        setIsLoading(false);
      } catch (error) {
        Alert.alert((error as Error).message);
      }
    };

    fetchVan();
  }, [id]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false, //basic if we want multer to read it
    });

    if (!result.canceled && result.assets?.length > 0) {
      const newImage: EditableImage = {
        id: generateRandomId(),
        uri: result.assets[0].uri,
        isLocal: true,
      };
      setImages((prev) => [...prev, newImage]);
    }
  };

  const handleDeleteClick = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));

    const deletedImage = images.find((img) => img.id === imageId);
    if (deletedImage && !deletedImage.isLocal && deletedImage.path) {
      setDeletedImages((prev) => [...prev, deletedImage.path!]);
    }
  };

  const handleRestoreClick = () => {
    setModel(originalVan!.model);
    setBrand(originalVan!.brand);
    setDescription(originalVan!.description);
    setPrice(originalVan!.price);

    setVehicleTraits(originalVan?.traits);
    setVehicleFeatures(originalVan?.features);

    setImages(originalVan!.images);
  };

  const handleUpdateClick = () => {
    try {
      setIsLoading(true);
      const changedData = getChangedFields();
      updateVanData(changedData)
        .then(() => {
          Alert.alert("Van correctly updated!");
          setIsLoading(false);
          router.push("/(tabs)/profile");
        })
        .catch((error) => {
          console.error(error);
          Alert.alert((error as Error).message);
        });
    } catch (error) {
      console.error(error);

      Alert.alert((error as Error).message);
    }
  };

  const getChangedFields = (): UpdateVanParam => {
    const { doors, bedCount, windows, maxTravellers, storage, ...restTraits } =
      vehicleTraits!;

    const processedTraits = {
      ...restTraits,
      doors: parseInt(doors),
      bedCount: parseInt(bedCount),
      windows: parseInt(windows),
      maxTravellers: parseInt(maxTravellers),
      storage: parseInt(storage),
    };

    const processedPrice = parseInt(price);

    const newImages = images.filter((img) => img.isLocal);

    const imagesToDelete = deletedImages;

    const vanId = Array.isArray(id) ? id[0] : id;

    const updates: UpdateVanParam = {
      id: vanId,
      model,
      brand,
      description,
      price: processedPrice,
      features: vehicleFeatures!,
      traits: processedTraits,
      imagesToUpload: newImages,
      imagesToDelete,
    };

    return updates;
  };
  return isLoading ? (
    <Loading size="large" isLoading={isLoading} />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text style={styles.title}>Edit van</Text>

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
          value={vehicleTraits!.accessible}
          onToggle={() =>
            setVehicleTraits({
              ...vehicleTraits!,
              accessible: !vehicleTraits!.accessible,
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
            value={vehicleTraits![field]}
            onChangeText={(text) =>
              setVehicleTraits({ ...vehicleTraits!, [field]: text })
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
                vehicleFeatures![f as keyof typeof vehicleFeatures] as boolean
              }
              onToggle={() =>
                setVehicleFeatures({
                  ...vehicleFeatures!,
                  [f]: !vehicleFeatures![f as keyof typeof vehicleFeatures],
                })
              }
            />
            <Text style={styles.label}>{f}</Text>
          </View>
        )
      )}

      <Text style={styles.sectionTitle}>Toilet</Text>
      <View style={styles.optionsRow}>
        {(["fixed", "portable", "none"] as const).map((type) => (
          <Pressable
            key={type}
            onPress={() =>
              setVehicleFeatures({ ...vehicleFeatures!, toilet: type })
            }
          >
            <Text
              style={[
                styles.optionButton,
                vehicleFeatures!.toilet === type && styles.optionButtonSelected,
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
              setVehicleTraits({ ...vehicleTraits!, fuelType: type })
            }
          >
            <Text
              style={[
                styles.optionButton,
                vehicleTraits!.fuelType === type && styles.optionButtonSelected,
              ]}
            >
              {type}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView horizontal style={{ marginVertical: spacing.md }}>
        {images.map((image, index) => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Pressable onPress={() => handleDeleteClick(image.id)}>
              <MaterialCommunityIcons name="delete-outline" size={20} />
            </Pressable>
          </View>
        ))}
        <Pressable style={styles.addImageBox} onPress={() => pickImage()}>
          <Text style={styles.addImageText}>+</Text>
        </Pressable>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={styles.submitButton}
          onPress={() => {
            handleUpdateClick();
          }}
        >
          <Text style={styles.submitText}>Update</Text>
        </Pressable>
        <Pressable
          style={styles.submitButton}
          onPress={() => {
            handleRestoreClick();
          }}
        >
          <MaterialCommunityIcons name="restore" size={24} color="white" />
          <Text style={styles.submitText}>Restore</Text>
        </Pressable>
      </View>
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
  buttonWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    width: "40%",
    justifyContent: "center",
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
  addImageBox: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },

  addImageText: {
    fontSize: 36,
    color: "#888",
    fontWeight: "bold",
  },
});

export default EditVan;
