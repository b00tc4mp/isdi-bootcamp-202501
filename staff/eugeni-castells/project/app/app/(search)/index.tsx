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
import SearchBox from "@/components/Search/SearchBox";
import { SelectedDate, SelectedLocation } from "@/components/Search/types";
import CalendarFilter from "@/components/Search/CalendarFilter";
import { useAuthRedirect } from "@/custom-hooks/useAuthRedirect";

export default function SearchScreen() {
  useAuthRedirect();

  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [location, setLocation] = useState<SelectedLocation>(null);
  const [dateRange, setDateRange] = useState<SelectedDate>({
    start: null,
    end: null,
  });

  const router = useRouter();

  const handleLocation = (location: SelectedLocation) => {
    setLocation(location);
  };

  const handleDatesSet = (dateRange: SelectedDate) => {
    setDateRange(dateRange);
    setDisplayCalendar(false);
  };

  const handleClearAll = () => {
    setLocation(null);
    setDateRange({
      start: null,
      end: null,
    });
    setDisplayCalendar(false);
  };

  const handleDisplayCalendar = () => {
    setDisplayCalendar(true);
  };

  const handleSearchPress = () => {
    console.log(dateRange.start?.number);
    const startDate = dateRange.start?.date;
    const endDate = dateRange.end?.date;
    router.push({
      pathname: "/(tabs)", // HomeScreen
      params: {
        longitude: location?.coordinates[0].toString(),
        latitude: location?.coordinates[1].toString(),
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      },
    });
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
        {!location && <DestinationBox onSearchClick={handleLocation} />}
        {location && (
          <SearchBox
            text="Where"
            displayText={location!.name}
            type="location"
          />
        )}
        {!displayCalendar ? (
          <SearchBox
            text="When"
            displayText={
              dateRange.start && dateRange.end
                ? `${dateRange.start.month} ${dateRange.start.number} - ${dateRange.end.month} ${dateRange.end.number}`
                : "Add dates"
            }
            type="calendar"
            onPressed={handleDisplayCalendar}
          />
        ) : (
          <View>
            <CalendarFilter onAcceptDates={handleDatesSet} />
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={() => {
            handleClearAll();
          }}
        >
          <Text style={styles.bottomText}>Clear all</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            handleSearchPress();
          }}
        >
          {<Feather name="search" size={24} color={Colors.light.buttonText} />}
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
