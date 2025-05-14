import { validate } from "com";
import { Van } from "../data";
import { NotFoundError, SystemError } from "com/errors";

export const getVanLocation = (
  userId: string,
  vanId: string
): Promise<object> => {
  validate.id(userId, "user id");

  return (async () => {
    let van;
    try {
      van = await Van.findById(vanId).lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!van) {
      throw new NotFoundError("van not found");
    }

    return van.location;
  })();
};
