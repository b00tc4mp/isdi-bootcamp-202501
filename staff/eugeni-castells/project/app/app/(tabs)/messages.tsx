import { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { getChats } from "@/services";
import { ReturnedSanitizedChat } from "@/com/types";

export default function MessagesScreen() {
  const [chats, setChats] = useState<ReturnedSanitizedChat[] | null>(null);

  useEffect(() => {
    try {
      getChats().then((chats) => {
        setChats(chats);
      });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {chats?.map((chat) => {
        return <Text>{chat.id}</Text>;
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
