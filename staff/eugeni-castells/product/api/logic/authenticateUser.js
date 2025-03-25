import { errors, validate } from "com";
import { data } from "../data/index.js";
import bcrypt from "bcryptjs";

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

      return bcrypt
        .compare(password, user.password)
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((match) => {
          if (!match) throw new CredentialsError("wrong credentials");

          return user._id.toString();
        });
    });
};
