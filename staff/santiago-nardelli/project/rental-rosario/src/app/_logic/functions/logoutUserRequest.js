import { data } from "../../_data/index.js";

export const logoutUser = () => {
  data.token = null;
};
