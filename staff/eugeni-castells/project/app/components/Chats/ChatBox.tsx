import { spacing } from "@/constants/Paddings";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { ChatBoxProps } from "./types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { capitalize } from "@/app/utils";

const ChatBox = ({
  interlocutor,
  lastMessage,
  lastSent,
  onItemClick,
}: ChatBoxProps) => {
  return (
    <Pressable style={styles.container} onPress={onItemClick}>
      <FontAwesome name="user-circle" size={40} color="#888" />
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {capitalize(interlocutor.name)} {capitalize(interlocutor.lastName)}
        </Text>
        {lastMessage && (
          <Text style={styles.message} numberOfLines={1}>
            {lastMessage}
          </Text>
        )}
        <Text style={styles.timestamp}>{lastSent}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
});

export default ChatBox;
