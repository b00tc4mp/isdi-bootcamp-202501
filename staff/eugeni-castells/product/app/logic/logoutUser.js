import { data } from "../data/index.js";

const logoutUser = () => {
  data.token = null;
};

export default logoutUser;
