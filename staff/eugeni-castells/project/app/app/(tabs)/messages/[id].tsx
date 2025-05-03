import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ReturnedSanitizedChatMessages } from "@/com/types";
import { useState, useEffect } from "react";
import { getChatMessages } from "@/services/getChatMessages";
import { Text, View } from "@/components/Themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { sendMessage } from "@/services/sendMessage";
import { spacing } from "@/constants/Paddings";

const chatDetail = () => {
  const [history, setHistory] = useState<ReturnedSanitizedChatMessages | []>(
    []
  );
  const [messageToSend, setMessageToSend] = useState<string>("");

  const [fetchHistoryController, setFetchHistoryController] =
    useState<boolean>(false);

  const { id } = useLocalSearchParams();

  const handleSendMessage = () => {
    try {
      if (!(id instanceof Array)) {
        sendMessage(id, messageToSend)
          .catch((error) => {
            Alert.alert(error.message);
          })
          .then(() => {
            setFetchHistoryController(!fetchHistoryController);
            setMessageToSend("");
          });
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    try {
      if (!(id instanceof Array)) {
        getChatMessages(id)
          .then((chat) => {
            setHistory(chat);
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }, [fetchHistoryController]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {history.map((message, index) => {
          return (
            <View
              key={index}
              style={[
                styles.messageContainer,
                { alignItems: message.own ? "flex-end" : "flex-start" },
              ]}
            >
              <Text>{message.author.name}</Text>
              <Text>{message.text}</Text>
              <Text>{message.modifiedAt?.toISOString()}</Text>
            </View>
          );
        })}
        <View style={styles.sendContainer}>
          <TextInput
            placeholder="message..."
            onChangeText={(text) => setMessageToSend(text)}
            value={messageToSend}
          />
          <MaterialCommunityIcons
            name="send"
            size={24}
            color="black"
            onPress={() => {
              handleSendMessage();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: "relative" },
  sendContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: spacing.lg,
  },
  messageContainer: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
});

export default chatDetail;
