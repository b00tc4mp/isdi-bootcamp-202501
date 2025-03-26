import { data } from "../data/index.js";
import { errors, validate } from "com";

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
      if (!user || user.password !== password)
        throw new CredentialsError("invalid credentials");

      if (!user) throw new NotFoundError("user not found");

      return user._id.toString();
    })

};
