import { validate, errors } from "../../com";
import { data } from "../data/index.js";

const { CredentialsError } = errors;
const loginUser = function (username, password) {
  validate.password(password, "password");
  validate.username(username, "username");

  let found = data.users.findOne((user) => user.username === username);

  if (!found || found.password !== password)
    throw new CredentialsError("wrong credentials");

  data.token = found.id;
};

export default loginUser;
