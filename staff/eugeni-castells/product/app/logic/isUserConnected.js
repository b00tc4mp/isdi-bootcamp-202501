import { data } from "../data/index.js";

const isUserConnected = () => {
  return !!data.token;
};

export default isUserConnected;
