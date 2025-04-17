import Constants from "expo-constants";

const getEnv = () => {
  const { apiUrl } = Constants.expoConfig?.extra || {};

  if (!apiUrl) throw new Error("apiUrl is missing in app.config.ts");

  return { apiUrl };
};

export default getEnv;
