import { validate } from "com";
import bcrypt from "bcryptjs";
import { User } from "../data";
import { DuplicityError, SystemError } from "com/errors";
import { IUser } from "../data/index.js";

export const registerUser = (
  name: string,
  username: string,
  email: string,
  password: string
): Promise<void> => {
  validate.username(username, "username");
  validate.email(email, "email");
  validate.password(password, "password");
  validate.text(name, "name");
  validate.minLength(name, 3, "name");
  validate.maxLength(name, 15, "name");

  return bcrypt
    .hash(password, 10)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((hashedPassword) => {
      const newUser: Partial<IUser> = {
        name,
        username,
        email,
        password: hashedPassword,
      };

      return User.create(newUser).catch((error) => {
        if (error.code === 11000)
          throw new DuplicityError("user already exists");

        throw new SystemError(error.message);
      });
    })
    .then(() => {});
};
