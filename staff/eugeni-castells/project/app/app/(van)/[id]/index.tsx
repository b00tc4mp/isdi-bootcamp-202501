import { useEffect, useState } from "react";
import { Alert, ImageBackground, Pressable, StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { CaruselDefault } from "@/components/CaruselDefault";
import { getVanById } from "@/services/getVanById";
import { VanDetailInfo } from "@/com/types";
import { Loading } from "@/components/Loading";
import { useRouter } from "expo-router";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import BookCalendar from "@/components/Book/BookCalendar";

export default function VanDetailScreen() {
  const [displayCalendar, setDisplayCalendar] = useState<boolean>(false);
  const [van, setVan] = useState<VanDetailInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const { id } = useLocalSearchParams();

  const router = useRouter();
  useEffect(() => {
    const fetchVan = async () => {
      try {
        if (!Array.isArray(id)) {
          const van = await getVanById(id);
          setVan(van);
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert((error as Error).message);
        router.push("/(tabs)");
      }
    };

    setIsLoading(true);
    fetchVan();
  }, [id]);

  const handleBookClick = () => {
    setDisplayCalendar(true);
  };

  const handleReturnNavigation = () => {
    setDisplayCalendar(false);
  };

  const handleDateSelection = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => {
    setSelectedDates({ start: startDate, end: endDate });
  };
  return (
    <View style={styles.container}>
      {displayCalendar && (
        <BookCalendar
          onReturnClick={handleReturnNavigation}
          onAcceptButton={handleDateSelection}
        />
      )}
      <View style={styles.caruselContainer}>
        {van && (
          <CaruselDefault
            showDots={true}
            dotsHeight={13}
            slides={van.images}
            renderItem={(slide, index) => {
              return (
                <ImageBackground
                  key={index}
                  source={{ uri: slide }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                ></ImageBackground>
              );
            }}
          />
        )}
      </View>
      <View>
        <Text>
          {van?.model}, {van?.brand}
        </Text>
        <Text>
          {van?.location.city}, {van?.location.country}
        </Text>
      </View>
      <Text>{van?.description}</Text>
      <View>
        {van
          ? Object.entries(van?.vehicleTraits!).map((trait, index) => {
              return (
                <Text key={index}>
                  {trait[0]}:
                  {typeof trait[1] === "boolean"
                    ? trait[1]
                      ? "Yes"
                      : "No"
                    : trait[1]}
                </Text>
              );
            })
          : null}
      </View>
      <View>
        {van
          ? Object.entries(van?.features!).map((trait, index) => {
              return (
                <Text key={index}>
                  {trait[0]}:
                  {typeof trait[1] === "boolean"
                    ? trait[1]
                      ? "Yes"
                      : "No"
                    : trait[1]}
                </Text>
              );
            })
          : null}
      </View>
      <Text>
        {van?.owner?.name}
        {van?.owner.lastName}
      </Text>
      <View style={styles.footerContainer}>
        <Text style={styles.priceText}>€{van?.price}/night</Text>
        <Pressable
          style={styles.bookButton}
          onPress={() => {
            handleBookClick();
          }}
        >
          <Text style={styles.bookButtonText}>Book Van</Text>
        </Pressable>
      </View>
      <Loading isLoading={isLoading} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  caruselContainer: {
    height: "35%",
  },
  footerContainer: {
    width: "100%",
    padding: spacing.md,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookButton: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: Colors.light.button,
    borderRadius: 10,
  },
  bookButtonText: {
    color: Colors.light.buttonText,
    fontWeight: Typography.fontWeight.bolder,
  },
  priceText: {
    fontWeight: Typography.fontWeight.bold,
  },
});
