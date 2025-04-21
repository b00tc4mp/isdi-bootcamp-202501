import { FlatList, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { SearchBar } from "@/components/Home/SearchBar";
import { ReturnedVansType } from "@/com/types";
import { VanCard } from "@/components/Home/VanCard";
import { spacing } from "@/constants/Paddings";
import { VanListProps } from "./types";

export default function VanList({ vans }: VanListProps) {
  return (
    <FlatList
      data={vans}
      keyExtractor={(item, index) => `van-${index}`}
      renderItem={({ item }) => <VanCard vanInfo={item} />}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {},
});
