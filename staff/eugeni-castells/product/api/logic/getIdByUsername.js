import { NotFoundError, SystemError } from "com/errors.js";
import { User } from "../data/index.js";
import { validate } from "com";

export const getIdByUsername = (userId, targetUsername) => {
  validate.id(userId);
  validate.username(targetUsername);

  return User.findOne({ username: targetUsername })
    .lean()
    .catch((error) => {
      console.error(error);

      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const id = user._id.toString();

      return id;
    });
};
