import { ImageBackground, StyleSheet, Text } from "react-native";
import { View } from "../Themed";
import { CaruselDefault } from "../CaruselDefault";
import { ReturnedVansType } from "@/com/types";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { capitalize } from "@/app/utils";
import { spacing } from "@/constants/Paddings";

type VanCardProps = {
  vanInfo: ReturnedVansType;
};

export const VanCard = ({ vanInfo }: VanCardProps) => {
  const [caruselWidth, setCarouselWidth] = useState<number | null>(null);

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
                    source={{ uri: slide }} //Utilitzem uri perquè es tracta d'una imatge que no és local. A més a més, el require(slide) no funcionaria a nivell sintàctic.
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.bottomWrapper}>
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
        <View></View>
      </View>
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
  bottomWrapper: {},
  bottomWrapperLeft: {
    display: "flex",
    gap: spacing.xs,
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
});
