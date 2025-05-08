import { SystemError } from "@/com/errors";
import { data } from "@/data";

export const logoutUser = async () => {
  try {
    await data.removeToken();
  } catch (error) {
    throw new SystemError((error as Error).message);
  }
};
