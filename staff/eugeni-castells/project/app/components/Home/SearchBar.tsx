import { View, Text } from "@/components/Themed";
import { StyleSheet, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Paddings";
export const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FontAwesome name="search" size={24} color={Colors.light.tabItemLine} />
        <View>
          <TextInput placeholder="Start your search" style={styles.input} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.rem,
    backgroundColor: Colors.light.background,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.rem,
  },
  input: {
    fontSize: 24,
  },
});
