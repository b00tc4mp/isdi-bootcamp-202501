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
  const handleContainerClick = () => {
    console.log("eureka");
    onItemClick();
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        handleContainerClick();
      }}
    >
      <FontAwesome name="user-circle-o" size={24} color="black" />
      <View>
        <Text>
          {capitalize(interlocutor.name)} {capitalize(interlocutor.lastName)}
        </Text>
        {lastMessage && <Text>Last message: {lastMessage}</Text>}
        <Text>Sent: {lastSent}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
});
export default ChatBox;
