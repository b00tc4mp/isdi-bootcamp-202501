import { data } from "../data/index.js";
import { errors, validate } from "com";
import bcrypt from "bcryptjs";

const { CredentialsError, NotFoundError, SystemError } = errors;

export const authenticateUser = (email, password) => {
  validate.email(email, "email");
  validate.password(password, "password");

  return data.users
    .findOne({ email })
    .catch(() => {
      throw new SystemError("Error connecting to database");
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return bcrypt
        .compare(password, user.password)
        .catch(() => {
          throw new SystemError("Error connecting to database");
        })
        .then((match) => {
          if (!match) {
            throw new CredentialsError("Wrong credential");
          }
          return user._id.toString();
        });
    });
};
