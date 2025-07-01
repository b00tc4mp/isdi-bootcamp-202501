import { User } from "../data/index.js";
import { validate, errors } from "com";
import bcrypt from "bcryptjs";

const { DuplicityError, SystemError } = errors;
export const registerUser = (name, email, password) => {
  validate.text(name);
  validate.maxLength(name, 20);
  validate.email(email);
  validate.password(password);

  return bcrypt
    .hash(password, 10)
    .catch(() => {
      throw new SystemError("Error connecting to database");
    })

    .then((hash) => {
      const user = {
        name: name,
        email: email,
        password: hash,
      };
      return User.create(user)
      .catch((error) => {
        if (error.code === 11000) throw new DuplicityError("user already exists"); 

        throw new SystemError(error.message);
      });
    })
    .then(() => {});
};
