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
  //The params we receive are strings. We want to keep it that way so it's easier to generate the queryString in the fetchVans request
  useEffect(() => {
    const fetchVans = async () => {
      try {
        //we have to do all this formatting because the localParams can return either a string or an array of strings so we have to be sura we are sending strings alone
        let notArrayLongitude;
        if (!Array.isArray(longitude)) notArrayLongitude = longitude;
        let notArrayLatitude;
        if (!Array.isArray(latitude)) notArrayLatitude = latitude;
        let notArrayStartDate;
        if (!Array.isArray(startDate)) notArrayStartDate = startDate;
        let notArrayEndDate;
        if (!Array.isArray(endDate)) notArrayEndDate = endDate;
        let notArrayTravellers;
        if (!Array.isArray(travellers)) notArrayTravellers = travellers;

        const vans = await getVans(
          notArrayLongitude!,
          notArrayLatitude!,
          notArrayStartDate!,
          notArrayEndDate!,
          notArrayTravellers!
        );
        setVans(vans);
      } catch (error) {
        Alert.alert((error as Error).message);
      }
    };

    fetchVans();
  }, []);

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
