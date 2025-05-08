import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ReturnedSanitizedChatMessages } from "@/com/types";
import { useState, useEffect } from "react";
import { getChatMessages } from "@/services/getChatMessages";
import { Text, View } from "@/components/Themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { sendMessage } from "@/services/sendMessage";
import { spacing } from "@/constants/Paddings";
import AntDesign from "@expo/vector-icons/AntDesign";

const chatDetail = () => {
  const [history, setHistory] = useState<ReturnedSanitizedChatMessages | []>(
    []
  );
  const [messageToSend, setMessageToSend] = useState<string>("");

  const { id } = useLocalSearchParams();

  const chatPartner = history.find((m) => !m.own)?.author;

  const handleSendMessage = () => {
    try {
      if (!(id instanceof Array)) {
        sendMessage(id, messageToSend)
          .catch((error) => {
            Alert.alert(error.message);
          })
          .then(() => {
            setMessageToSend("");
            return getChatMessages(id)
              .then((message) => {
                setHistory(message);
              })
              .catch((error) => {
                Alert.alert(error.message);
              });
          });
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    if (!id || id instanceof Array) return;

    const interval = setInterval(() => {
      getChatMessages(id)
        .then(setHistory)
        .catch((error) => Alert.alert(error.message));
    }, 2000);

    return () => clearInterval(interval);
    //we have to use the !!id to update when the id changes from undefined to something, because if not it never enters the interval
  }, [!!id]);

  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          router.back();
        }}
      />
      <Text style={styles.title}>
        Chat with{" "}
        {chatPartner ? `${chatPartner.name} ${chatPartner.lastName}` : "user"}
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {history.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {
                alignItems: message.own ? "flex-end" : "flex-start",
              },
            ]}
          >
            <View
              style={[
                styles.bubble,
                message.own ? styles.bubbleOwn : styles.bubbleOther,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestamp}>
                {message.createdAt
                  ? new Date(message.createdAt).toLocaleString("ca-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : ""}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sendContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escriu un missatge..."
          onChangeText={(text) => setMessageToSend(text)}
          value={messageToSend}
        />
        <MaterialCommunityIcons
          name="send"
          size={24}
          color="black"
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: spacing.md,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  messageContainer: {
    marginBottom: spacing.sm,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bubbleOwn: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  bubbleOther: {
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 11,
    color: "#888",
    textAlign: "right",
    marginTop: 4,
  },
  sendContainer: {
    flexDirection: "row",
    padding: spacing.md,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
});

export default chatDetail;
