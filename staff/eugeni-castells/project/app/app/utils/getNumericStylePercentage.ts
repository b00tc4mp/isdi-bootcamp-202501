import { constant } from "@/com";
import { Dimensions } from "react-native";

export const getNumericStylePercentage = (
  percentage: string | number
): number => {
  if (
    typeof percentage === "string" &&
    constant.PERCENTAGE_STRING_REGEX.test(percentage)
  ) {
    const percent = parseFloat(percentage) / 100;
    return Dimensions.get("window").height * percent;
  }
  return typeof percentage === "number" ? percentage : 0;
};
