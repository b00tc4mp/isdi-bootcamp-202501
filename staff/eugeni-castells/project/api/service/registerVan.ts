import { validate } from "com";
import { NotFoundError, SystemError } from "com/errors";
import { User, Van } from "../data";
import { NewVanInfo } from "./types";

export const registerVan = (
  userId: string,
  newVanInfo: NewVanInfo
): Promise<void> => {
  validate.id(userId, "user id");

  return (async () => {
    try {
      const user = await User.findById(userId);

      if (!user) throw new NotFoundError("user not found");

      const van = await Van.create({
        ...newVanInfo,
        owner: user._id,
      });

      user.vans.push(van._id);

      await User.updateOne({ _id: userId }, { $set: { vans: user.vans } });
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      throw new SystemError(err.message);
    }
  })();
};
