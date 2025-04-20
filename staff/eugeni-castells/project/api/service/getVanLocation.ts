import { validate } from "com";
import { Van } from "../data";
import { SystemError } from "com/errors";

export const getVanLocation = (userId: string, vanId: string) => {
  validate.id(userId, "user id");

  return Van.findById({ vanId })
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((van) => {
      return van?.location;
    });
};
