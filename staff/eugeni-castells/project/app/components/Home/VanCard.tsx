import { ImageBackground, StyleSheet, Text, Pressable } from "react-native";
import { View } from "../Themed";
import { CaruselDefault } from "../CaruselDefault";
import { ReturnedVansType } from "@/com/types";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { capitalize } from "@/app/utils";
import { spacing } from "@/constants/Paddings";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

type VanCardProps = {
  vanInfo: ReturnedVansType;
};

export const VanCard = ({ vanInfo }: VanCardProps) => {
  const [caruselWidth, setCarouselWidth] = useState<number | null>(null);
  const router = useRouter();
  const handleVanClick = () => {
    //Això no e spot fer perquè expo router valida en temps de validació i ho veu com una string qualsevol, no dinàmica.
    //Malgrat el resultat de la ruta final si que sigui van/3543j24j34f
    // router.push(`/(van)/${vanInfo._id}`);
    router.push({
      pathname: "/(van)/[id]",
      params: { id: vanInfo.id },
    });
  };

  const handleReviewClick = () => {
    router.push({
      pathname: "/(van)/[id]/reviews",
      params: { id: vanInfo.id },
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={styles.topWrapper}
        onLayout={(event) => {
          const width = event.nativeEvent.layout.width;
          setCarouselWidth(width);
        }}
      >
        {caruselWidth && (
          <CaruselDefault
            slides={vanInfo.images}
            dotsHeight={12}
            caruselWidth={caruselWidth}
            renderItem={(slide, index) => {
              return (
                <View style={styles.imageWrapper}>
                  <ImageBackground
                    key={index}
                    source={{ uri: slide.url }} //Utilitzem uri perquè es tracta d'una imatge que no és local. A més a més, el require(slide) no funcionaria a nivell sintàctic.
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
        )}
      </View>
      <Pressable
        style={styles.bottomWrapper}
        onPress={() => {
          handleVanClick();
        }}
      >
        <View style={styles.bottomWrapperLeft}>
          <View style={styles.bottomWrapperLeftTopWrapper}>
            <Text style={styles.modelStyle}>
              {capitalize(vanInfo.model)}, {vanInfo.brand}
            </Text>
            <Text style={styles.locationStyle}>
              {capitalize(vanInfo.location.city)},
              {capitalize(vanInfo.location.country)}
            </Text>
          </View>
          <Text style={styles.price}>
            € {vanInfo.price} Travel Points / Night
          </Text>
        </View>
        <Pressable
          style={styles.rightWrapper}
          onPress={() => {
            handleReviewClick();
          }}
        >
          <Text style={styles.rightWrapperText}>
            {vanInfo.averageRating}{" "}
            <AntDesign name="star" size={18} color="black" />(
            {vanInfo.reviews.length})
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  topWrapper: {
    aspectRatio: "5/4",
  },
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomWrapperLeft: {
    display: "flex",
    gap: spacing.xs,
    width: "75%",
  },
  bottomWrapperLeftTopWrapper: {
    display: "flex",
  },
  locationStyle: {
    fontSize: 16,
    color: Colors.light.vanCardLocation,
  },
  modelStyle: {
    fontSize: 22,
    fontWeight: 500,
    color: Colors.light.text,
  },
  bottomWrapperLeftBottomWrapper: {},
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  price: {
    fontSize: 18,
    fontWeight: 500,
  },
  rightWrapper: {},
  rightWrapperText: {
    fontSize: 18,
  },
});
