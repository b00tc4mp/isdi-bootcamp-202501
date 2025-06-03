import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { ReturnedExchangesObject } from "@/com/types";
import { getUserExchanges } from "@/services/getUserExchanges";
import { spacing } from "@/constants/Paddings";
import ExchangesFoldedItem from "@/components/Exchanges/ExchangesFoldedItem";

const tabs = {
  trips: ["trips", "user trips", "vans trips"],
  requests: ["requests", "user requests", "pending requests"],
};

export default function ExchangeScreen() {
  const [exchanges, setExchanges] = useState<ReturnedExchangesObject | null>(
    null
  );
  const [tab, setTab] = useState<"trips" | "requests">("trips");
  const [view, setView] = useState<string>("trips");

  useEffect(() => {
    fetchUserExchanges();
  }, []);

  const fetchUserExchanges = () => {
    try {
      getUserExchanges()
        .then((exchanges) => setExchanges(exchanges))
        .catch((error) => Alert.alert(error.message));
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const renderSubTabs = () => {
    return tabs[tab].map((item) => (
      <Pressable
        key={item}
        onPress={() => setView(item)}
        style={[styles.subTab, view === item && styles.subTabActive]}
      >
        <Text
          style={[styles.subTabText, view === item && styles.subTabTextActive]}
        >
          {item === "trips"
            ? "All"
            : item === "requests"
            ? "All"
            : item.replace(/\b\w/g, (l) => l.toUpperCase())}
        </Text>
      </Pressable>
    ));
  };

  const renderContent = () => {
    let list: any[] = [];

    if (tab === "trips") {
      list =
        view === "trips"
          ? exchanges?.trips.all ?? []
          : view === "user trips"
          ? exchanges?.trips.user ?? []
          : exchanges?.trips.vans ?? [];
    } else {
      list =
        view === "requests"
          ? exchanges?.pendingRequests.all ?? []
          : view === "user requests"
          ? exchanges?.pendingRequests.user ?? []
          : exchanges?.pendingRequests.toUser ?? [];
    }

    if (!list || list.length === 0) {
      return (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
            {view === "trips"
              ? "You don't have any trips in this category yet."
              : view === "user trips"
              ? "You haven't booked any trips yet."
              : view === "vans trips"
              ? "No one has booked your vans yet."
              : view === "user requests"
              ? "You haven't sent any requests yet."
              : view === "pending requests"
              ? "No one has requested your vans yet."
              : "There are no requests in this view."}
          </Text>
        </View>
      );
    }

    return list?.map((trip, index) => (
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
        onConfirm={fetchUserExchanges}
        handleRequestButtons={
          trip.owner?.isUser && trip.confirmStatus === "pending"
        }
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => {
            setTab("trips");
            setView("trips");
          }}
          style={[styles.tab, tab === "trips" && styles.tabActive]}
        >
          <Text
            style={[styles.tabText, tab === "trips" && styles.tabTextActive]}
          >
            Trips
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setTab("requests");
            setView("requests");
          }}
          style={[styles.tab, tab === "requests" && styles.tabActive]}
        >
          <Text
            style={[styles.tabText, tab === "requests" && styles.tabTextActive]}
          >
            Requests
          </Text>
        </Pressable>
      </View>

      <View style={styles.subTabsContainer}>{renderSubTabs()}</View>

      <ScrollView style={{ width: "100%" }}>{renderContent()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: spacing.lg,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#f0f0f0",
  },
  tabActive: {
    backgroundColor: "#222",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
  },
  tabTextActive: {
    color: "#fff",
  },
  subTabsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  subTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#eee",
  },
  subTabActive: {
    backgroundColor: "#444",
  },
  subTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  subTabTextActive: {
    color: "#fff",
  },
});
