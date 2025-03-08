import data from "../data";

const getOnlineUserInfo = function () {
  let found;

  found = data.users.getById(data.userId);

  if (!found) throw new Error("User not found");
  else return found;
};

export default getOnlineUserInfo;
