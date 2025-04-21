import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";

export default function VanDetailScreen() {
  const { id } = useLocalSearchParams();

  return <View></View>;
}
