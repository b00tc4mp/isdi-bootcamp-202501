import { data } from "../data/index.js";

const logoutUser = () => {
  data.userId = null;
};

export default logoutUser;
