import { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { getChats } from "@/services";
import { ReturnedSanitizedChat } from "@/com/types";
import ChatBox from "@/components/Chats/ChatBox";
import { useRouter } from "expo-router";

export default function MessagesScreen() {
  const [chats, setChats] = useState<ReturnedSanitizedChat[] | null>(null);
  const [fetchController, setFetchController] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    try {
      getChats().then((chats) => {
        setChats(chats);
      });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }, [fetchController]);

  setTimeout(() => {
    setFetchController(!fetchController);
  }, 2000);

  const handleChatBoxClick = (id: string) => {
    router.push(`/(chat)/${id}`);
    console.log(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {chats?.map((chat, index) => {
        return (
          <ChatBox
            key={index}
            interlocutor={chat?.interlocutor}
            lastSent={
              chat.modifiedAt
                ? chat.modifiedAt.toISOString()
                : chat.createdAt.toISOString()
            }
            lastMessage={
              chat.history.length > 0
                ? chat.history[chat?.history?.length - 1].text
                : "No messages yet"
            }
            onItemClick={() => {
              handleChatBoxClick(chat.id);
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
