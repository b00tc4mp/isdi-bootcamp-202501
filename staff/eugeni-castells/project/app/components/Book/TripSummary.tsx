import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "../Themed";
import { TripSummaryProps } from "./types";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { capitalize } from "@/app/utils";
import { Typography } from "@/constants/Typography";

const TripSummary = ({ tripInfo }: TripSummaryProps) => {
  const { onDatesClick, onRequestTripClick } = tripInfo;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.datesContainer}
        onPress={() => {
          onDatesClick();
        }}
      >
        <Text style={styles.datesText}>
          {tripInfo.startDate.toDateString()}{" "}
          <AntDesign name="arrowright" size={16} color="black" />{" "}
          {tripInfo.endDate.toDateString()}
        </Text>
      </TouchableOpacity>
      <Text style={styles.priceText}>
        To: {capitalize(tripInfo.location.city)},{" "}
        {capitalize(tripInfo.location.country)}
      </Text>
      <Text style={styles.priceText}>
        Total price: {tripInfo.totalPrice}
        <MaterialIcons name="euro" size={16} color="black" />
      </Text>
      <Pressable
        onPress={() => {
          onRequestTripClick();
        }}
        style={({ pressed }) => [styles.requestButton]}
      >
        <Text style={styles.requestText}>Request Trip</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  datesContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  datesText: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.normal,
    color: "#222",
  },
  priceText: {
    fontSize: 16,
    color: "#555",
    marginBottom: spacing.sm,
  },
  requestButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  requestText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: Typography.fontWeight.bolder,
  },
});

export default TripSummary;
