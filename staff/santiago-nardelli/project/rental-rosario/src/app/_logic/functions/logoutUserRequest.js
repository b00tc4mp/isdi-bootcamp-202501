import { data } from "../../_data/index.js";

export const logoutUserRequest = () => {
  data.token = null;
};
