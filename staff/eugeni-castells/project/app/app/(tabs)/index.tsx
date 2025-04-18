import { Alert, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useState, useEffect } from "react";
import { getVans } from "@/services/getVans";
import { VanDocType } from "@/com/types";

export default function HomeScreen() {
  const [vans, setVans] = useState<VanDocType[]>([]);

  useEffect(() => {
    debugger;
    try {
      getVans().then((vans) => {
        setVans(vans);
      });
    } catch (error) {
      const err = error as Error;

      Alert.alert(err.message);
    }
  }, []);

  return (
    <View>
      <Text>
        {vans.map((van, index) => {
          return <Text key={index}>{van.model}</Text>;
        })}
      </Text>
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
});
