import { validate } from "./validate.js";
import data from "../data/index.js";

export const authenticateUser = function (username, password) {
  validate.password(password, "password");
  validate.username(username, "username");

  let found = data.users.findOne((user) => user.username === username);

  if (!found || found.password !== password)
    throw new Error("wrong credentials");

  return found.id;
};
