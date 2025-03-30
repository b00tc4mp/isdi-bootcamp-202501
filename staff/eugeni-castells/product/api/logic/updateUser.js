import { User } from "../data/index.js";

import { errors, validate } from "com";

const { NotFoundError, OwnershipError, SystemError } = errors;

export const updateUser = (userId, userInfo) => {
  validate.id(userId);

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((userFound) => {
      if (!userFound) throw new NotFoundError("user not found");

      if (userId !== userFound._id.toString())
        throw new OwnershipError("user cannot modify other user's info");

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
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
};
