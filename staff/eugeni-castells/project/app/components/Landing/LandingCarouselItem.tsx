import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { LandingItemProps } from "./types";
import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Paddings";
export function LandingCarouselItem({
  image,
  title,
  description,
  index,
}: LandingItemProps) {
  return (
    <ImageBackground
      source={image}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.carouselContainer}>
        <Text style={styles.landingCaruselItemTitle}>{title}</Text>
        <Text style={styles.landingCaruselItemDescription}>{description}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // ocupa tot l'espai del parent
    backgroundColor: "rgba(0, 0, 0, 0.4)", // negre amb opacitat
    zIndex: 1,
  },
  carouselContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: "20%",
    gap: spacing.md,
    padding: spacing.lg,
    zIndex: 2,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  landingCaruselItemTitle: {
    color: Colors.light.caruselItemTitle,
    fontWeight: "700",
    fontSize: 24,
  },
  landingCaruselItemDescription: {
    color: Colors.light.caruselItemDescription,
    fontSize: 16,
  },
});
