import { validate } from "./validate.js";
import data from "../data/index.js";
import { CredentialsError, NotFoundError } from "./errors.js";

export const authenticateUser = function (username, password) {
  validate.password(password, "password");
  validate.username(username, "username");

  let found = data.users.findOne((user) => user.username === username);

  if (!found) throw new NotFoundError("user not found");

  if (!found || found.password !== password)
    throw new CredentialsError("wrong credentials");

  return found.id;
};
