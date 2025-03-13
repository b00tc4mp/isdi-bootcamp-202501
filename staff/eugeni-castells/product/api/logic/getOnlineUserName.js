import { getOnlineUserInfo } from "./getOnlineUserInfo.js";

export const getOnlineUserName = (userId) => {
  const user = getOnlineUserInfo(userId);

  return user.name;
};
