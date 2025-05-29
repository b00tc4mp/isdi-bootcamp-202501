import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";
import { spacing } from "@/constants/Paddings";
import { MessageBoxProps } from "./types";
import { Colors } from "@/constants/Colors";

const MessageBox = ({ own, message, sent }: MessageBoxProps) => {
  return (
    <View
      style={
        (styles.container, { justifyContent: own ? "flex-end" : "flex-start" })
      }
    >
      {!own && <FontAwesome name="user-circle-o" size={24} color="black" />}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.dateText}>{sent}</Text>
      </View>
      {own && <FontAwesome name="user-circle-o" size={24} color="black" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    flexDirection: "row",
  },
  messageContainer: {
    gap: spacing.md,
    borderWidth: 1,
  },
  messageText: {
    fontSize: spacing.md,
  },
  dateText: {
    fontSize: spacing.sm,
    color: Colors.light.secondaryText,
  },
});

export default MessageBox;
