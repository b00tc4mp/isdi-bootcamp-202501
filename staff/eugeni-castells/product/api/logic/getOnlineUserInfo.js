import { User } from "../data/index.js";
const { NotFoundError, OwnershipError } = errors;
import { errors, validate } from "../../com/index.js";

export const getOnlineUserInfo = function (userId) {
  validate.id(userId, "user id");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((found) => {
      if (!found) throw new NotFoundError("user not found");
      else return found;
    });
};
