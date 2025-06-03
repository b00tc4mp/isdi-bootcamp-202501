import { errors } from "@/com";
import * as Location from "expo-location";

const { LocationError } = errors;

export const checkLocationPermit =
  async (): Promise<Location.LocationPermissionResponse> => {
    try {
      return await Location.getForegroundPermissionsAsync();
    } catch (error) {
      const err = error as Error;

      throw new LocationError(err.message);
    }
  };
