import { data } from "../data/index.js";
const { NotFoundError, OwnershipError } = errors;
import { errors, validate } from "../../com/index.js";
const { ObjectId } = data;

export const getOnlineUserInfo = function (userId) {
  validate.id(userId, "user id");

  return data.users
    .findOne({ _id: new ObjectId(userId) })
    .catch((error) => console.error(error))
    .then((found) => {
      if (userId !== found._id.toString())
        throw new OwnershipError("user id not id of the user info returned");

      if (!found) throw new NotFoundError("User not found");
      else return found;
    })
    .catch((error) => console.error(error));
};
