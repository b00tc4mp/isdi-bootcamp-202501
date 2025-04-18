import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { StyledLandingHeader } from "@/components/Landing/StyledLandingHeader";
import { LandingCarouselItem } from "@/components/Landing/LandingCarouselItem";
import { slides } from "@/data";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function LandingScreen() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/(auth)/register");
  };

  const handleLoginClick = () => {
    router.push("/(auth)/login");
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    //Això indica en quina pàgina et trobes. Dividim la longitud total que portem recorreguda per l'amplada de la pantalla i trunquem.
  };

  return (
    <View style={styles.container}>
      <StyledLandingHeader>CamperBoat{"\n"}Exchange</StyledLandingHeader>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ width: width * slides.length }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <LandingCarouselItem
              index={index}
              image={slide.image}
              title={slide.title}
              description={slide.description}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    display: "flex",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
});
