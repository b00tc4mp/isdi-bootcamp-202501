import data from "../data";

import { validate } from "./validate";

const updateUser = (userInfo) => {
  const { name, email, username, password } = userInfo;

  validate.username(username, "username");
  validate.email(email, "email");
  validate.password(password), "password";
  validate.text(name, "name");
  validate.minLength(1, "name");
  validate.maxLength(20, "name");

  const userId = data.userId;
  const user = data.users.getById(userId);

  const updatedUser = {
    ...user,
    username: username,
    name: name,
    email: email,
    password: password,
    modifiedAt: new Date(),
  };

  data.users.updateOne(updatedUser);
};

export default updateUser;
