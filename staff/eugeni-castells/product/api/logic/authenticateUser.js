import { errors, validate } from "com";
import { data } from "../data/index.js";

const { CredentialsError, NotFoundError, SystemError } = errors;

export const authenticateUser = (username, password) => {
  validate.password(password, "password");
  validate.username(username, "username");

  return data.users
    .findOne({ username })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      if (user.password !== password)
        throw new CredentialsError("wrong credentials");

      return user._id.toString();
    });
};
