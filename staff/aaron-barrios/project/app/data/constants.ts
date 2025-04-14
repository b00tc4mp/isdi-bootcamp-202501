import Constants from "expo-constants";

const getEnv = () => {
    const extra = Constants.expoConfig?.extra || Constants.manifest?.extra;

    const apiUrl = extra?.apiUrl;

    if (!apiUrl) throw new Error("apiUrl is missing in app.config.ts")

    return { apiUrl }
}

export default getEnv
