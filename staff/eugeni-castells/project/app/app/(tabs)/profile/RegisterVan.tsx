import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { TextInput, Button, Image, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

const RegisterVan = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
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
        placeholder="price per night..."
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => {
          setPrice(text);
        }}
      />
      <Pressable onPress={() => pickImage()}>
        <Text>Select Images</Text>
      </Pressable>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default RegisterVan;
