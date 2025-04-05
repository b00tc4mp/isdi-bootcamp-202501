import { data } from "../data/index.js";

const isUserLoggedIn = () => {
  return !!data.token;
};

export default isUserLoggedIn;
