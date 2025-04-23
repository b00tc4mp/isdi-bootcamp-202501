import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { SearchBar } from "@/components/Home/SearchBar";
import { useState, useEffect } from "react";
import { getVans } from "@/services/getVans";
import { ReturnedVansType } from "@/com/types";
import VanList from "@/components/Home/VanList";
import { spacing } from "@/constants/Paddings";

export default function HomeScreen() {
  const [vans, setVans] = useState<ReturnedVansType[]>([]);
  const { longitude, latitude, startDate, endDate, travellers } =
    useLocalSearchParams();

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const parsedLongitude = longitude
          ? JSON.parse(longitude as string)
          : null;
        const parsedLatitude = latitude ? JSON.parse(latitude as string) : null;
        const parsedStartDate = startDate
          ? JSON.parse(startDate as string)
          : null;
        const parsedEndDate = endDate ? JSON.parse(endDate as string) : null;
        const parsedTravellers = travellers
          ? JSON.parse(travellers as string)
          : null;

        const vans = await getVans(
          parsedLongitude,
          parsedLatitude,
          parsedStartDate,
          parsedEndDate,
          parsedTravellers
        );
        setVans(vans);
      } catch (error) {
        Alert.alert((error as Error).message);
      }
    };

    fetchVans();
  }, [location, startDate, endDate, longitude, latitude, travellers]);

  return (
    <View style={styles.container}>
      <SearchBar />
      {vans.length > 0 && <VanList vans={vans} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.rem * 2,
  },
  vanList: {
    flex: 1,
  },
  vanCardWrapper: {
    // marginBottom: spacing.rem,
    flex: 1,
  },
});
