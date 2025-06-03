import { View, Text } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Paddings";
import { useRouter } from "expo-router";

export const SearchBar = () => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/(search)");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleSearchClick}>
      <View style={styles.wrapper}>
        <AntDesign name="search1" size={18} color={Colors.light.tabItemLine} />
        <Text>Start your search</Text>
      </View>
    </TouchableOpacity>
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
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
});
