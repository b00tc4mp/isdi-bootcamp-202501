import { useEffect, useState } from "react";

import { Alert, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { ReturnedExchanges, ReturnedExchangesObject } from "@/com/types";
import { getUserExchanges } from "@/services/getUserExchanges";

export default function ExchangeScreen() {
  const [exchanges, setExchanges] = useState<ReturnedExchangesObject | null>(
    null
  );
  const [view, setView] = useState<
    "trips" | "user requests" | "requests received"
  >("trips");

  useEffect(() => {
    try {
      getUserExchanges()
        .then((exchanges) => {
          setExchanges(exchanges);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            setView("trips");
          }}
          style={[styles.button, view === "trips" && styles.selectedButton]}
        >
          <Text>Your Trips</Text>
          {exchanges?.trips.map((trip) => {
            return <Text>{trip.owner.name}</Text>;
          })}
        </Pressable>
        <Pressable
          onPress={() => {
            setView("requests received");
          }}
          style={[
            styles.button,
            view === "requests received" && styles.selectedButton,
          ]}
        >
          <Text>Requests Received</Text>
          <Text>Your Trips</Text>
          {exchanges?.userRequests.map((trip) => {
            return <Text>{trip.owner.name}</Text>;
          })}
        </Pressable>
        <Pressable
          onPress={() => {
            setView("user requests");
          }}
          style={[
            styles.button,
            view === "user requests" && styles.selectedButton,
          ]}
        >
          <Text>Your Requests</Text>
          {exchanges?.pendingRequests.map((trip) => {
            return <Text>{trip.owner.name}</Text>;
          })}
        </Pressable>
      </View>
      {view === "trips" && (
        <>
          <Text style={styles.title}>Your trips</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          ></View>
        </>
      )}
      {view === "user requests" && (
        <>
          <Text style={styles.title}>Trip requests</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          ></View>
        </>
      )}
      {view === "requests received" && (
        <>
          <Text style={styles.title}>Requests received</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          ></View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedButtonText: {
    fontWeight: "bold",
    color: "#111",
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
