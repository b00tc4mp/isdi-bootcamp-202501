import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "../Themed";
import { ReviewBoxProps } from "./types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { spacing } from "@/constants/Paddings";

const ReviewBox = ({ author, rating, comment }: ReviewBoxProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.authorBox}>
          <FontAwesome name="user-circle" size={24} color="black" />
          <Text>
            {author.name} {author.lastName}
          </Text>
        </View>
        <View style={styles.ratingBox}>
          <AntDesign name="star" size={24} color="black" />
          <Text>{rating}</Text>
        </View>
      </View>
      <Text>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  authorBox: {
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "center",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});

export default ReviewBox;
