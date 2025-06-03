import { PopulatedReview } from "@/com/types";
import { Text, View } from "@/components/Themed";
import { getVanReviews } from "@/services/getVanReviews";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ReviewBox from "@/components/Reviews/ReviewBox";
import { spacing } from "@/constants/Paddings";
import { Typography } from "@/constants/Typography";

const VanReviews = () => {
  const [reviews, setReviews] = useState<PopulatedReview[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useLocalSearchParams();

  const router = useRouter();
  useEffect(() => {
    const fetchVan = async () => {
      try {
        if (!Array.isArray(id)) {
          const reviewsObject = await getVanReviews(id);
          setReviews(reviewsObject.reviews);
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert((error as Error).message);
        router.back();
      }
    };

    setIsLoading(true);
    fetchVan();
  }, [id]);

  const handleArrowClick = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => {
            handleArrowClick();
          }}
        />
        <Text style={styles.headerText}>Users' reviews</Text>
      </View>
      <ScrollView>
        {reviews.map((review, index) => {
          return (
            <ReviewBox
              key={index}
              author={review.author}
              comment={review.comment}
              rating={review.rating}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingTop: spacing.lg * 2,
  },
  header: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    zIndex: 2,
    padding: spacing.md,
    gap: "42%",
    alignItems: "center",
  },
  headerText: {
    fontSize: spacing.md,
    fontWeight: Typography.fontWeight.bolder,
  },
});
export default VanReviews;
