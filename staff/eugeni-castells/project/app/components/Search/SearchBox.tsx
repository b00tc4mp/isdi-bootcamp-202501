import { StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { spacing } from "@/constants/Paddings";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { AddBoxProps } from "./types";

const StartDateBox = ({ text, displayText }: AddBoxProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.calendarDisplayText}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: "white", // necessari perquè l'ombra es vegi
    borderRadius: 16,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  text: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    fontWeight: Typography.fontWeight.bolder,
  },
  calendarDisplayText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: Typography.fontWeight.bolder,
  },
});
export default StartDateBox;
