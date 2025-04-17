import { errors } from "@/com";
import { data } from "@/data";
const { NotFoundError } = errors;

export const isUserLoggedIn = async () => {
  try {
    const token = await data.getToken();

    return !!token;
  } catch (error) {
    console.error(error);

    const err = error as Error;

    throw new NotFoundError(err.message);
  }
};
