import { User } from "../data/index.js";
const { NotFoundError, OwnershipError } = errors;
import { errors, validate } from "../../com/index.js";

export const getOnlineUserInfo = function (userId) {
  validate.id(userId, "user id");

  return User.findById(userId)
    .lean()
    .catch((error) => console.error(error))
    .then((found) => {
      if (!found) throw new NotFoundError("User not found");

      if (userId !== found._id.toString())
        throw new OwnershipError("user id not id of the user info returned");
      else return found;
    })
    .catch((error) => console.error(error));
};
