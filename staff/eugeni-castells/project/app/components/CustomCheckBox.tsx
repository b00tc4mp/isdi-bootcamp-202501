import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type CustomCheckBoxProps = {
  value: boolean;
  onToggle: () => void;
};

const CustomCheckBox = ({ value, onToggle }: CustomCheckBoxProps) => {
  return (
    <Pressable onPress={onToggle}>
      <FontAwesome
        name={value ? "toggle-on" : "toggle-off"}
        size={24}
        color="black"
      />
    </Pressable>
  );
};

export default CustomCheckBox;
