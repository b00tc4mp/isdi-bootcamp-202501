import data from "../data/index.js";
const { NotFoundError, OwnershipError } = errors;
import { errors, validate } from "../../com/index.js";

export const getOnlineUserInfo = function (userId) {
  validate.id(userId, "user id");

  let found;

  found = data.users.getById(userId);

  if (userId !== found.id)
    throw new OwnershipError("user id not id of the user info returned");

  if (!found) throw new NotFoundError("User not found");
  else return found;
};
