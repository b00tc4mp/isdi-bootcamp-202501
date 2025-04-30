import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { TripRequestProps } from "./types";
import { spacing } from "@/constants/Paddings";

const TripRequest = (tripInfo: TripRequestProps) => {
  <View style={styles.container}>
    <View>
      <Text>
        {tripInfo.vanModel}, {tripInfo.vanBrand}
      </Text>
      <Text>Start Date: {tripInfo.startDate.toLocaleString()}</Text>
      <Text>End Date: {tripInfo.endDate.toLocaleString()}</Text>
      <Text>
        Location: {tripInfo.location.city}, {tripInfo.location.country}
      </Text>
      <Text>Total Price: {tripInfo.totalPrice}</Text>
    </View>
    <View style={styles.bottomContainer}>
      <Pressable>Cancel</Pressable>
      <Pressable>Request Trip</Pressable>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TripRequest;
