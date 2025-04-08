import { User } from "../data/index.js";

import { errors, validate } from "com";

const { NotFoundError, SystemError } = errors;

export const updateUser = (userId, userInfo) => {
  validate.id(userId);

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((userFound) => {
      if (!userFound) throw new NotFoundError("user not found");

      const { name, email, username, password } = userInfo;

      if (username) validate.username(username, "username");

      if (email) validate.email(email, "email");

      if (password) validate.password(password), "password";

      if (name) {
        validate.text(name, "name");
        validate.minLength(1, "name");
        validate.maxLength(20, "name");
      }

      return User.updateOne({ _id: userId }, { $set: userInfo }).catch(
        (error) => {
          throw new SystemError(error.message);
        }
      );
    })
    .then(() => {});
};
