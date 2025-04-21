import { useState } from "react";
import { DestinationBox } from "@/components/Search/DestinationBox";
import { Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { View, Text } from "@/components/Themed";
import { borderRadius, spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Typography } from "@/constants/Typography";
import StartDateBox from "@/components/Search/SearchBox";

export default function SearchScreen() {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [travellers, setTravellers] = useState([{}]);

  const router = useRouter();

  const handleLocation = (location: string) => {
    setLocation(location);
  };

  const handleClearAll = () => {
    setLocation("");
    setDateRange([]);
    setTravellers([{}]);
  };

  const handleClose = () => {
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <AntDesign
          name="close"
          size={24}
          color={Colors.light.searchDestinationColor}
          style={{ marginBottom: spacing.rem }}
          onPress={handleClose}
        />
        {location.length === 0 && (
          <DestinationBox onSearchClick={handleLocation} location={location} />
        )}
        {location.length > 0 && (
          <StartDateBox text="Where" displayText={location} />
        )}
        <StartDateBox text="When" displayText="Add dates" />
        <StartDateBox text="Who" displayText="Add travellers" />
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={() => {
            handleClearAll();
          }}
        >
          <Text style={styles.bottomText}>Clear all</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Feather name="search" size={24} color={Colors.light.buttonText} />
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.opaqueWhite,
    position: "relative",
  },
  topContainer: {
    padding: spacing.lg,
    backgroundColor: Colors.light.opaqueWhite,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  button: {
    flexDirection: "row",
    padding: spacing.xsmd,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    backgroundColor: Colors.light.button,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: borderRadius.button,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.light.buttonText,
    marginLeft: spacing.md,
  },
  bottomText: {
    fontWeight: Typography.fontWeight.bold,
    borderBottomWidth: 1,
    borderColor: Colors.light.text,
  },
});
