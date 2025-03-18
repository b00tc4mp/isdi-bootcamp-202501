import { validate } from "./validate.js";
import { data } from "../data/index.js";

const loginUser = function (username, password) {
  validate.password(password, "password");
  validate.username(username, "username");

  let found = data.users.findOne((user) => user.username === username);

  if (!found || found.password !== password)
    throw new Error("wrong credentials");

  data.userId = found.id;
};

export default loginUser;
