import { data } from "../data/index.js";
import { errors, validate } from "com";

const { ObjectId } = data;
const { NotFoundError, SystemError } = errors;

export const getUserName = (userId) => {
  validate.id(userId, "userId");

  return data.users
    .findOne({ _id: new ObjectId(userId) })
    .catch(() => {
      throw new SystemError("database error", error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return user.name;
    });
};
