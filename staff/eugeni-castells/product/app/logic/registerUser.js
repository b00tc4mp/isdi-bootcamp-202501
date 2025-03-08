import { validate } from "./validate";
import data from "../data";

export const registerUser = function (userInfo) {
  validate.text(userInfo.name, "name");
  validate.minLength(userInfo.name, 1, "name");
  validate.maxLength(userInfo.name, 20, "name");
  validate.email(userInfo.email, "email");
  validate.username(userInfo.username, "username");
  validate.password(userInfo.password, "password");

  const userFound = data.users.findOne(
    (user) =>
      user.username === userInfo.username || user.email === userInfo.email
  );

  if (userFound) throw new Error("user already exists");

  const user = {
    name: userInfo.name,
    email: userInfo.email,
    username: userInfo.username,
    password: userInfo.password,
    createdAt: new Date(),
    modifiedAt: null,
  };

  data.users.insertOne(user);
};
