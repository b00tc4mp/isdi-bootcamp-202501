import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { CaruselDefault } from "@/components/CaruselDefault";
import { StyledLandingHeader } from "@/components/Landing/StyledLandingHeader";
import { LandingCarouselItem } from "@/components/Landing/LandingCarouselItem";
import { slides } from "@/data";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { spacing } from "@/constants/Paddings";

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
      <CaruselDefault
        showDots={true}
        slides={slides}
        renderItem={(item, index) => (
          <View key={index}>
            <LandingCarouselItem
              index={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          </View>
        )}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={handleRegisterClick}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleLoginClick}
        >
          <Text style={styles.buttonText}>I Already Have An Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
    display: "flex",
  },
  buttonWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 13,
    gap: spacing.md,
    height: "20%",
    display: "flex",
    justifyContent: "center",
    padding: spacing.md,
  },
  buttonMain: {
    width: "100%",
    backgroundColor: Colors.light.button,
    padding: spacing.rem * 0.75,
    borderRadius: 10,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "white",
    padding: spacing.rem * 0.75,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.light.buttonText,
    textAlign: "center",
  },
});
