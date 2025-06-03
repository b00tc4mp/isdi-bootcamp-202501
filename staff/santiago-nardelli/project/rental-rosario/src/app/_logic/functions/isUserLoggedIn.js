import { data } from "../../_data/index.js";

export const isUserLoggedIn = () => !!data.token;
