import { TextInput, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { spacing } from "@/constants/Paddings";

export const DestinationBox = () => {
  return (
    <View style={styles.container}>
      <Text>Where to?</Text>
      <TextInput placeholder="Search destinations" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.rem,
    backgroundColor: "white", // necessari perquè l'ombra es vegi
    borderRadius: 50,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android
    elevation: 2,
  },
});
