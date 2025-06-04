import { data } from "../data/index.js";

const isUserConnected = () => {
  return !!data.userId;
};

export default isUserConnected;
