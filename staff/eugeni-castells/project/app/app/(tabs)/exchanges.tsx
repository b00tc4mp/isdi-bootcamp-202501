import { useEffect, useState } from "react";

import { Alert, Pressable, StyleSheet, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";

import { ReturnedExchangesObject } from "@/com/types";
import { getUserExchanges } from "@/services/getUserExchanges";
import { spacing } from "@/constants/Paddings";
import ExchangesFoldedItem from "@/components/Exchanges/ExchangesFoldedItem";

export default function ExchangeScreen() {
  const [exchanges, setExchanges] = useState<ReturnedExchangesObject | null>(
    null
  );

  const [view, setView] = useState<
    | "trips"
    | "user trips"
    | "vans trips"
    | "requests"
    | "user requests"
    | "pending requests"
  >("trips");

  useEffect(() => {
    fetchUserExchanges();
  }, []);

  const fetchUserExchanges = () => {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            setView("trips");
          }}
          style={[
            styles.button,
            (view === "trips" ||
              view === "user trips" ||
              view === "vans trips") &&
              styles.selectedButton,
          ]}
        >
          <Text>Trips</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setView("requests");
          }}
          style={[
            styles.button,
            (view === "requests" ||
              view === "pending requests" ||
              view === "user requests") &&
              styles.selectedButton,
          ]}
        >
          <Text>Requests</Text>
        </Pressable>
      </View>
      <View style={styles.headerContainer}>
        {(view === "trips" ||
          view === "user trips" ||
          view === "vans trips") && (
          <>
            <Pressable
              onPress={() => {
                setView("trips");
              }}
            >
              <Text>All</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setView("user trips");
              }}
            >
              <Text> User Trips</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setView("vans trips");
              }}
            >
              <Text>Vans' Trips</Text>
            </Pressable>
          </>
        )}
        {(view === "requests" ||
          view === "pending requests" ||
          view === "user requests") && (
          <>
            <Pressable
              onPress={() => {
                setView("requests");
              }}
            >
              <Text>All</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setView("user requests");
              }}
            >
              <Text> User Requests</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setView("pending requests");
              }}
            >
              <Text>Requests To Confirm</Text>
            </Pressable>
          </>
        )}
      </View>
      <ScrollView style={{ width: "100%" }}>
        {view === "trips" && (
          <>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            ></View>
            {exchanges?.trips.all.map((trip, index) => {
              return (
                <ExchangesFoldedItem
                  key={index}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  status={trip.confirmStatus}
                  owner={trip.owner}
                  renter={trip.renter}
                  createdAt={trip.createdAt}
                  price={trip.price}
                  id={trip.id}
                />
              );
            })}
          </>
        )}
        {view === "user trips" && (
          <>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            ></View>
            {exchanges?.trips.user.map((trip, index) => {
              return (
                <ExchangesFoldedItem
                  key={index}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  status={trip.confirmStatus}
                  owner={trip.owner}
                  renter={trip.renter}
                  createdAt={trip.createdAt}
                  price={trip.price}
                  id={trip.id}
                />
              );
            })}
          </>
        )}
        {view === "vans trips" && (
          <>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            ></View>
            {exchanges?.trips.vans.map((trip, index) => {
              return (
                <ExchangesFoldedItem
                  key={index}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  status={trip.confirmStatus}
                  owner={trip.owner}
                  renter={trip.renter}
                  createdAt={trip.createdAt}
                  price={trip.price}
                  id={trip.id}
                />
              );
            })}
          </>
        )}
        {view === "requests" && (
          <>
            <Text style={styles.title}>All Your requests</Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            ></View>

            {exchanges?.pendingRequests.all.map((trip, index) => {
              return (
                <ExchangesFoldedItem
                  key={index}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  status={trip.confirmStatus}
                  owner={trip.owner}
                  renter={trip.renter}
                  createdAt={trip.createdAt}
                  price={trip.price}
                  id={trip.id}
                  handleRequestButtons={trip.owner.isUser}
                  onConfirm={fetchUserExchanges}
                />
              );
            })}
          </>
        )}
        {view === "user requests" && (
          <>
            <Text style={styles.title}>Your requests</Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            ></View>

            {exchanges?.pendingRequests.user.map((trip, index) => {
              return (
                <ExchangesFoldedItem
                  key={index}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  status={trip.confirmStatus}
                  owner={trip.owner}
                  renter={trip.renter}
                  createdAt={trip.createdAt}
                  price={trip.price}
                  id={trip.id}
                />
              );
            })}
          </>
        )}
        {view === "pending requests" && (
          <>
            <Text style={styles.title}>Your requests</Text>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            ></View>

            {exchanges?.pendingRequests.toUser.map((trip, index) => {
              return (
                <ExchangesFoldedItem
                  key={index}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  status={trip.confirmStatus}
                  owner={trip.owner}
                  renter={trip.renter}
                  createdAt={trip.createdAt}
                  price={trip.price}
                  onConfirm={fetchUserExchanges}
                  handleRequestButtons={trip.owner.isUser}
                  id={trip.id}
                />
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: spacing.lg,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    // marginHorizontal: 5,
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
