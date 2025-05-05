import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
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
import BookIndex from "@/components/Book/BookIndex";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Entypo from "@expo/vector-icons/Entypo";

import { capitalize } from "@/app/utils";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export default function VanDetailScreen() {
  const [displayBookView, setDisplayBookView] = useState<boolean>(false);
  const [van, setVan] = useState<VanDetailInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleReviewsClick = () => {
    try {
      console.log(id);
      router.push(`/(van)/${id}/reviews`);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleSelectDatesClick = () => {
    setDisplayBookView(true);
  };

  const handleReturnNavigation = () => {
    setDisplayBookView(false);
  };

  const handleBackClick = () => {
    router.back();
  };
  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        style={styles.backContainer}
        onPress={() => {
          handleBackClick();
        }}
      />
      {displayBookView && (
        <BookIndex
          onVanDetailScreenNavigation={handleReturnNavigation}
          price={van!.price}
          location={van!.location}
          occupiedDates={van!.occupiedDates}
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
      <View style={styles.contentContainer}>
        <View style={styles.firstContentBlockContainer}>
          <View>
            <Pressable
              onPress={() => {
                handleReviewsClick();
              }}
              style={styles.reviewsBlock}
            >
              <Text>{van?.averageRating}</Text>
              <AntDesign name="star" size={18} color="black" />
              <Text>({van?.reviews.length})</Text>
            </Pressable>
          </View>
          <View>
            <View style={{ width: "85%" }}>
              <Text style={styles.titleText}>
                {van?.model}, {van?.brand}
              </Text>
              {van?.location && (
                <Text style={styles.locationText}>
                  {capitalize(van!.location.city)},{" "}
                  {capitalize(van!.location.country)}
                </Text>
              )}
              {van && (
                <View style={styles.traitsContainer}>
                  <Text style={styles.traitsText}>
                    passangers {van.vehicleTraits.maxTravellers} ·{" "}
                  </Text>
                  <Text style={styles.traitsText}>
                    beds {van.vehicleTraits.bedCount} ·{" "}
                  </Text>
                  <Text style={styles.traitsText}>
                    storage {van.vehicleTraits.storage} ·{" "}
                  </Text>
                  <Text style={styles.traitsText}>
                    fuel {van.vehicleTraits.fuelType} ·{" "}
                  </Text>
                  <Text style={styles.traitsText}>
                    toilet {van.features.toilet}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{van?.description}</Text>
        </View>
        <View>
          {van ? (
            <View style={styles.featuresBox}>
              <Text style={styles.featuresTitle}>Features</Text>
              <ScrollView
                contentContainerStyle={styles.featuresContainer}
                horizontal={true}
              >
                <View style={styles.iconSquare}>
                  <FontAwesome5 name="shower" size={24} color="black" />
                </View>
                {van.features.heating && (
                  <View>
                    <View style={styles.iconSquare}>
                      <MaterialCommunityIcons
                        name="radiator"
                        size={24}
                        color="black"
                      />
                    </View>
                  </View>
                )}
                {van.features.insideKitchen && (
                  <View style={styles.iconSquare}>
                    <FontAwesome6 name="kitchen-set" size={24} color="black" />
                  </View>
                )}
                {van.features.airConditioning && (
                  <View style={styles.iconSquare}>
                    <Entypo name="air" size={24} color="black" />
                  </View>
                )}
                {van.accessible && (
                  <View style={styles.iconSquare}>
                    <MaterialIcons name="accessible" size={24} color="black" />
                  </View>
                )}
              </ScrollView>
            </View>
          ) : null}
        </View>
        <View style={styles.ownerContainer}>
          <Text style={styles.ownerTitle}>Owner</Text>
          <Text>
            {van?.owner?.name} {van?.owner.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.priceText}>€{van?.price}/night</Text>
        <Pressable
          style={styles.bookButton}
          onPress={() => {
            handleSelectDatesClick();
          }}
        >
          <Text style={styles.bookButtonText}>Book</Text>
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
  backContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3,
  },
  caruselContainer: {
    height: "30%",
  },
  firstContentBlockContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  contentContainer: {
    padding: spacing.md,
    gap: spacing.lg * 2,
  },
  reviewsBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  titleText: {
    fontSize: spacing.lg,
  },
  locationText: {
    fontSize: spacing.md,
    color: "#2C2C2C",
  },
  traitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  traitsText: {
    fontWeight: Typography.fontWeight.bolder,
  },
  descriptionContainer: {
    gap: spacing.xs,
  },
  descriptionTitle: {
    fontSize: 20,
  },
  descriptionText: {
    fontSize: spacing.md,
  },
  featuresBox: {
    gap: spacing.xsmd,
  },
  featuresTitle: {
    fontSize: 20,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: spacing.md,
  },
  iconSquare: {
    borderWidth: 1,
    borderColor: "black",
    padding: spacing.md,
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  ownerContainer: {
    gap: spacing.xs,
  },
  ownerTitle: {
    fontSize: 20,
  },
  footerContainer: {
    width: "100%",
    padding: spacing.md,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light.secondaryText,
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
