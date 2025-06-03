import AsyncStorage from "@react-native-async-storage/async-storage";
import { slides } from "./Content/Landing";
import { NotFoundError, SystemError } from "@/com/errors";
import { getRoleFromToken } from "../services/getRoleFromToken";

export const data = {
  async getToken(): Promise<string | null> {
    try {
      const json = await AsyncStorage.getItem("token");
      return json ? JSON.parse(json) : null;
    } catch (error) {
      console.error(error);

      throw new NotFoundError("token not found");
    }
  },

  async setToken(id: string | null): Promise<void> {
    try {
      if (id === null) {
        await AsyncStorage.removeItem("token");
      } else {
        const json = JSON.stringify(id);
        await AsyncStorage.setItem("token", json);
      }
    } catch (error) {
      console.error("Error saving token to storage:", error);
    }
  },
  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  },

  async setSeenLanding(): Promise<void> {
    try {
      await AsyncStorage.setItem("hasSeenLanding", "true");
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  },
};

export { slides, getRoleFromToken };
