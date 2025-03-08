import data from "../data";

const isUserConnected = () => {
  return !!data.userId;
};

export default isUserConnected;
