import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";

export const DestinationBox = () => {
  const [search, setSearch] = useState("");

  const handleInputChange = (text: string): void => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          paddingBottom: spacing.rem,
          fontWeight: Typography.fontWeight.bold,
        }}
      >
        Where to?
      </Text>
      <TextInput
        placeholder="Search destinations"
        style={styles.input}
        placeholderTextColor={Colors.light.searchDestinationColor}
        onChangeText={handleInputChange}
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: "white", // necessari perquè l'ombra es vegi
    borderRadius: 16,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android
    elevation: 4,
  },
  input: {
    borderColor: Colors.light.searchDestinationColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.rem * 0.8,
  },
});
