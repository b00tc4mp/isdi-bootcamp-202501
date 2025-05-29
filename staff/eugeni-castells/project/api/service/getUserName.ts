import { validate } from "com";
import { User } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { ReturnedFullName } from "./types";
export const getUserName = (userId: string): Promise<ReturnedFullName> => {
  validate.id(userId, "user id");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId).lean();
    } catch (error) {
      console.error(error);

      throw new SystemError((error as Error).message);
    }

    if (!user) throw new NotFoundError("user not found");

    return { name: user.name, lastName: user.lastName };
  })();
};
