import { data } from "../../_data/data.js";

export const logoutUser = () => {
  data.token = null;
};
