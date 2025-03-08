import getOnlineUserInfo from "./getOnlineUserInfo";

const getOnlineUserName = () => {
  const user = getOnlineUserInfo();

  return user.name;
};

export default getOnlineUserName;
