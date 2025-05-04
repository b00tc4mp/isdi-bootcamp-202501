import { Text, View } from "@/components/Themed";
import { useState } from "react";
import {
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ExpoImagePickerAsset, VehicleFeatures, VehicleTraits } from "./types";

import { generateRandomId } from "@/app/utils";
import CustomCheckBox from "@/components/CustomCheckBox";
import { registerVan } from "@/services";

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
  shower: "none",
};

const RegisterVan = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleTraits, setVehicleTraits] =
    useState<VehicleTraits>(vehicleTraitsDefault);
  const [vehicleFeatures, setVehicleFeatures] = useState<VehicleFeatures>(
    vehicleFeaturesDefault
  );
  const [images, setImages] = useState<ExpoImagePickerAsset[] | []>([]);

  const handleRegisterClick = () => {
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
        images: images,
      };
      registerVan(vanInfo)
        .then(() => {
          Alert.alert("van registered!");
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
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      console.log("entered the if");
      console.log(result.assets[0].uri);
      const newImage = {
        id: generateRandomId(),
        uri: result.assets[0].uri,
      };
      setImages((prev) => [...prev, newImage]);
    } else {
      console.warn("No image selected or assets empty:", result);
    }
  };

  const handleDeleteClick = (imageId: string) => {
    setImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  return (
    <ScrollView>
      <TextInput
        placeholder="model..."
        value={model}
        onChangeText={(text) => {
          setModel(text);
        }}
      />
      <TextInput
        placeholder="brand..."
        value={brand}
        onChangeText={(text) => {
          setBrand(text);
        }}
      />
      <TextInput
        placeholder="description..."
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <TextInput
        placeholder="price per night..."
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => {
          setPrice(text);
        }}
      />
      <Text>Vehicle Traits</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <CustomCheckBox
          value={vehicleTraits.accessible}
          onToggle={() =>
            setVehicleTraits({
              ...vehicleTraits,
              accessible: !vehicleTraits.accessible,
            })
          }
        />
        <Text style={{ marginLeft: 8 }}>Accessible</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
          value={vehicleTraits?.bedCount}
          onChangeText={(text) => {
            setVehicleTraits({ ...vehicleTraits, bedCount: text });
          }}
          placeholder="number of bed..."
        />
        <Text style={{ marginLeft: 8 }}>Number of beds</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
          value={vehicleTraits?.windows}
          onChangeText={(text) => {
            setVehicleTraits({ ...vehicleTraits, windows: text });
          }}
          placeholder="windows..."
        />
        <Text style={{ marginLeft: 8 }}>Number of windows</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
          value={vehicleTraits?.doors}
          onChangeText={(text) => {
            setVehicleTraits({ ...vehicleTraits, doors: text });
          }}
          placeholder="number of doors..."
        />
        <Text style={{ marginLeft: 8 }}>Number of doors</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TextInput
          value={vehicleTraits?.maxTravellers}
          onChangeText={(text) => {
            setVehicleTraits({ ...vehicleTraits, maxTravellers: text });
          }}
          placeholder="max number of passangers..."
        />
        <Text style={{ marginLeft: 8 }}>Max number of passengers</Text>
      </View>
      <Text>Vehicle Features</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <CustomCheckBox
          value={vehicleFeatures.heating}
          onToggle={() =>
            setVehicleFeatures({
              ...vehicleFeatures,
              heating: !vehicleFeatures.heating,
            })
          }
        />
        <Text style={{ marginLeft: 8 }}>Heating</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <CustomCheckBox
          value={vehicleFeatures.airConditioning}
          onToggle={() =>
            setVehicleFeatures({
              ...vehicleFeatures,
              airConditioning: !vehicleFeatures.airConditioning,
            })
          }
        />
        <Text style={{ marginLeft: 8 }}>Air Conditioning</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <CustomCheckBox
          value={vehicleFeatures.insideKitchen}
          onToggle={() =>
            setVehicleFeatures({
              ...vehicleFeatures,
              insideKitchen: !vehicleFeatures.insideKitchen,
            })
          }
        />
        <Text style={{ marginLeft: 8 }}>Inside kitchen</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <CustomCheckBox
          value={vehicleFeatures.fridge}
          onToggle={() =>
            setVehicleFeatures({
              ...vehicleFeatures,
              fridge: !vehicleFeatures.fridge,
            })
          }
        />
        <Text style={{ marginLeft: 8 }}>Fridge</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              toilet: "fixed",
            });
          }}
        >
          <Text>Fixed</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              toilet: "portable",
            });
          }}
        >
          <Text>Portable</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              toilet: "fixed",
            });
          }}
        >
          <Text>Fixed</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              toilet: "none",
            });
          }}
        >
          <Text>No toilet</Text>
        </Pressable>
        <Pressable>
          <Text></Text>
        </Pressable>

        <Pressable>
          <Text></Text>
        </Pressable>

        <Text style={{ marginLeft: 8 }}>Toilet</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              shower: "inside",
            });
          }}
        >
          <Text>Inside</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              shower: "outside",
            });
          }}
        >
          <Text>Outside</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              toilet: "fixed",
            });
          }}
        >
          <Text>Fixed</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setVehicleFeatures({
              ...vehicleFeatures,
              shower: "none",
            });
          }}
        >
          <Text>No shower</Text>
        </Pressable>
        <Pressable>
          <Text></Text>
        </Pressable>

        <Pressable>
          <Text></Text>
        </Pressable>

        <Text style={{ marginLeft: 8 }}>Shower</Text>
      </View>

      <Pressable onPress={() => pickImage()}>
        <Text>Select Images</Text>
      </Pressable>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {images &&
          images.map((image) => {
            return (
              <View style={styles.imageContainer} key={image.id}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.image}
                  onError={() => {
                    console.log("couldn't load image");
                  }}
                />
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    handleDeleteClick(image.id);
                  }}
                />
              </View>
            );
          })}
      </ScrollView>
      <Pressable
        onPress={() => {
          handleRegisterClick();
        }}
      >
        <Text>Register van</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: "auto",
  },
  imageContainer: {
    width: 200,
    height: 200,
    flexDirection: "row",
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default RegisterVan;
