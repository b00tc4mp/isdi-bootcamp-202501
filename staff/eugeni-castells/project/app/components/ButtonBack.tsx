import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type ButtonBackProps = {
  onPress: () => void;
};
const ButtonBack = ({ onPress }: ButtonBackProps) => {
  return (
    <Pressable
      style={styles.backButton}
      onPress={() => {
        onPress();
      }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
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

export default ButtonBack;
