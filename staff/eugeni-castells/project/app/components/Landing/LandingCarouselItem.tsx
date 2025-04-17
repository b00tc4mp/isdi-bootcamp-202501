import { ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { LandingItemProps } from "./types";
export function LandingCarouselItem({
  image,
  title,
  description,
  index,
  onRegisterClick,
  onLoginClick,
}: LandingItemProps) {
  const handleRegisterNavigation = () => {
    onRegisterClick();
  };

  const handleLoginNavigation = () => {
    onLoginClick();
  };
  return (
    <ImageBackground
      source={image}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.carouselContainer}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <View>
          <Button title="Register" onPress={handleRegisterNavigation} />
          <Button title="Log in" onPress={handleLoginNavigation} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
  },

  carouselContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});
