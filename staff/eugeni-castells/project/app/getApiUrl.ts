import { Platform } from "react-native";
import Constants from "expo-constants";

export const getApiUrl = (): string => {
  // 🌐 Web: usa un .env específic per web
  if (Platform.OS === "web") {
    return process.env.EXPO_PUBLIC_API_URL_WEB || "http://localhost:8080";
  }

  // 📱 Mobile (React Native)
  const isDev =
    Constants.appOwnership === "expo" &&
    (Constants.manifest2?.extra?.expoClient?.hostUri ?? "").length > 0;

  if (isDev) {
    const host =
      Constants.manifest2?.extra?.expoClient?.hostUri?.split(":")[0] ??
      Constants.manifest?.debuggerHost?.split(":")[0];

    if (host) {
      return `http://${host}:8080`;
    }
  }

  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  throw new Error("No API URL defined for environment.");
};
