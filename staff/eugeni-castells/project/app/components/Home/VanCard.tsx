import { ImageBackground, StyleSheet, Text } from "react-native";
import { View } from "../Themed";
import { CaruselDefault } from "../CaruselDefault";
import { ReturnedVansType } from "@/com/types";

type VanCardProps = {
  vanInfo: ReturnedVansType;
};

export const VanCard = ({ vanInfo }: VanCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomWrapper}>
        <CaruselDefault
          slides={vanInfo.images}
          renderItem={(slide, index) => {
            return (
              <ImageBackground
                key={index}
                source={{ uri: slide }} //Utilitzem uri perquè es tracta d'una imatge que no és local. A més a més, el require(slide) no funcionaria a nivell sintàctic.
                style={{ height: "50%", width: "100%" }}
                resizeMode="cover"
              />
            );
          }}
        />
      </View>
      <View style={styles.bottomWrapper}>
        <View>
          <View>
            <Text style={styles.locationStyle}>
              {vanInfo.location.city},{vanInfo.location.country}
            </Text>
          </View>
          <View></View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "30%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  bottomWrapper: {
    height: "80%",
  },
  locationStyle: {
    fontSize: 24,
    color: "black",
  },
});
