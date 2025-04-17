import { ImageSourcePropType } from "react-native";

export type LandingItemProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  index: number;
  onRegisterClick: () => void;
  onLoginClick: () => void;
};
