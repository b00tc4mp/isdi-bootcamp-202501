import { data } from "../../data/data.js";

export const logoutUser = () => {
  data.token = null;
};
