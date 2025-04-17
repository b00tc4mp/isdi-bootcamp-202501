import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { StyledLandingHeader } from "@/components/Landing/StyledLandingHeader";
import { LandingCarouselItem } from "@/components/Landing/LandingCarouselItem";
import { slides } from "@/data";
import { useRouter } from "expo-router";

export default function LandingScreen() {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/(auth)/register");
  };

  const handleLoginClick = () => {
    router.push("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <StyledLandingHeader>CamperBoat{"\n"}Exchange</StyledLandingHeader>
      <PagerView initialPage={0} style={styles.paperView}>
        {slides.map((slide, index) => {
          return (
            <LandingCarouselItem
              key={index}
              index={index}
              image={slide.image}
              title={slide.title}
              description={slide.description}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
            />
          );
        })}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  paperView: {
    flex: 1,
  },
  container: {
    height: "100%",
    position: "relative",
    display: "flex",
  },
});
