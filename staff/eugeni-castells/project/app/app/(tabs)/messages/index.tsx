import { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View as RNView,
  RefreshControl,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { getChats } from "@/services";
import { ReturnedSanitizedChat } from "@/com/types";
import ChatBox from "@/components/Chats/ChatBox";
import { useRouter } from "expo-router";
import { useAuthRedirect } from "@/custom-hooks/useAuthRedirect";

export default function MessagesScreen() {
  useAuthRedirect();

  const [chats, setChats] = useState<ReturnedSanitizedChat[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const fetchChats = () => {
    setRefreshing(true);
    getChats()
      .then((data) => setChats(data))
      .catch((err) => Alert.alert(err.message))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchChats();

    const interval = setInterval(fetchChats, 5000); // opcional: actualitza cada 5s
    return () => clearInterval(interval);
  }, []);

  const handleChatBoxClick = (id: string) => {
    router.push(`/(tabs)/messages/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      {chats?.length === 0 && (
        <Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
          No chats yet
        </Text>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchChats} />
        }
      >
        {chats?.map((chat) => (
          <ChatBox
            key={chat.id}
            interlocutor={chat.interlocutor}
            lastSent={
              chat.modifiedAt
                ? chat.modifiedAt.toISOString()
                : chat.createdAt.toISOString()
            }
            lastMessage={
              chat.history.length > 0
                ? chat.history.at(-1)?.text ?? null
                : "No messages yet"
            }
            onItemClick={() => handleChatBoxClick(chat.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
