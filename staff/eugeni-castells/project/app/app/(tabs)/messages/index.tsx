import { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { Text, View } from "@/components/Themed";
import { getChats } from "@/services";
import { ReturnedSanitizedChat } from "@/com/types";
import ChatBox from "@/components/Chats/ChatBox";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";

export default function MessagesScreen() {
  const [chats, setChats] = useState<ReturnedSanitizedChat[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchChats = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.warn("Token no disponible, no es fa fetch de chats");
        return;
      }

      const data = await getChats();
      setChats(data);
    } catch (err) {
      Alert.alert((err as Error).message);
    } finally {
      setRefreshing(false);
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    if (pathname === "/(tabs)/messages") {
      try {
        fetchChats().catch((error) => {
          Alert.alert((error as Error).message);
        });
      } catch (error) {
        Alert.alert((error as Error).message);
      }

      const interval = setInterval(() => {
        if (isMounted && pathname === "/(tabs)/messages") {
          fetchChats();
        }
      }, 5000);

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }
  }, [pathname]);

  useEffect(() => {
    try {
      fetchChats().catch((error) => {
        Alert.alert((error as Error).message);
      });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
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
