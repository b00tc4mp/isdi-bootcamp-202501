import { Alert, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { SearchBar } from "@/components/Home/SearchBar";
import { useState, useEffect } from "react";
import { getVans } from "@/services/getVans";
import { ReturnedVansType, VanDocType } from "@/com/types";
import { VanCard } from "@/components/Home/VanCard";

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
      {vans.length > 0 && (
        <View style={styles.vansContainer}>
          {vans.map((van, index) => {
            return <VanCard vanInfo={van} key={index} />;
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  vansContainer: {
    height: "80%",
  },
});
