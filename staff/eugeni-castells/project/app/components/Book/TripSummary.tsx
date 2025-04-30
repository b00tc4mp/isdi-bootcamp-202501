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
    height: "100%",
    paddingTop: "10%",
    padding: spacing.md,
    justifyContent: "space-between",
  },
  datesContainer: {
    padding: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  datesText: {
    color: Colors.light.text,
    fontSize: 18,
  },
  priceText: {
    fontSize: 20,
  },
  requestButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: Colors.light.button,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  requestText: {
    fontSize: 18,
    color: Colors.light.buttonText,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default TripSummary;
