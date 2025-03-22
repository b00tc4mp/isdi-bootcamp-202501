import { data } from "../data/index.js";

const { ObjectId } = data;

import { errors, validate } from "com";

const { NotFoundError, OwnershipError, SystemError } = errors;

export const updateUser = (userId, userInfo) => {
  validate.id(userId);

  const userObjectId = new ObjectId(userId);

  return data.users
    .findOne({ _id: userObjectId })
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

      return data.users
        .updateOne({ _id: userObjectId }, { $set: userInfo })
        .catch((error) => {
          throw new SystemError(error.message);
        });
    })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(() => {});
};
