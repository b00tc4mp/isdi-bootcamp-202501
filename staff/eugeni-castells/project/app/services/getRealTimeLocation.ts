import { errors } from "@/com/";
import * as Location from "expo-location";

const { LocationError } = errors;

type Coordinates = {
  latitude: number;
  longitude: number;
};

export const getRealTimeLocation = async (): Promise<Coordinates> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    const err = error as Error;

    throw new LocationError(err.message);
  }
};
