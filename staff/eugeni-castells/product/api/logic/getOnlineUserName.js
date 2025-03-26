import { validate } from "com";
import { getOnlineUserInfo } from "./getOnlineUserInfo.js";

export const getOnlineUserName = (userId) => {
  validate.id(id, "user id");

  const user = getOnlineUserInfo(userId);

  return user.name;
};
