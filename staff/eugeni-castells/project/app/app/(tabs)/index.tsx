import { Alert, StyleSheet, ScrollView } from "react-native";
import { View } from "@/components/Themed";
import { SearchBar } from "@/components/Home/SearchBar";
import { useState, useEffect } from "react";
import { getVans } from "@/services/getVans";
import { ReturnedVansType } from "@/com/types";
import VanList from "@/components/Home/VanList";
import { spacing } from "@/constants/Paddings";

export default function HomeScreen() {
  const [vans, setVans] = useState<ReturnedVansType[]>([]);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const vans = await getVans();
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
