import data from "../data/index.js";
import { NotFoundError, OwnershipError } from "./errors.js";

import { validate } from "./validate.js";

export const updateUser = (userId, userInfo) => {
  validate.id(userId);

  let userFound = data.users.getById(userId);

  if (!userFound) throw new NotFoundError("user not found");

  if (userId !== userFound.id)
    throw new OwnershipError("user cannot modify other user's info");

  const { name, email, username, password } = userInfo;

  validate.username(username, "username");
  validate.email(email, "email");
  validate.password(password), "password";
  validate.text(name, "name");
  validate.minLength(1, "name");
  validate.maxLength(20, "name");

  const user = data.users.getById(userId);

  const updatedUser = {
    ...user,
    username: username,
    name: name,
    email: email,
    password: password,
    modifiedAt: new Date(),
  };

  data.users.updateOne((user) => user.id === userId, updatedUser);
};
