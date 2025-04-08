import { errors, validate } from "com";
import { User } from "../data/index.js";
import bcrypt from "bcryptjs";
const { DuplicityError, SystemError } = errors;

export const registerUser = function (userInfo) {
  validate.text(userInfo.name, "name");
  validate.minLength(userInfo.name, 1, "name");
  validate.maxLength(userInfo.name, 20, "name");
  validate.email(userInfo.email, "email");
  validate.username(userInfo.username, "username");
  validate.password(userInfo.password, "password");

  const { email, username } = userInfo;

  return User.findOne({ $or: [{ email }, { username }] })

    .then((user) => {
      if (user) throw new DuplicityError("user already exists");

      return bcrypt
        .hash(userInfo.password, 10)
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((hash) => {
          const userToRegister = {
            name: userInfo.name,
            email: userInfo.email,
            username: userInfo.username,
            password: hash,
            createdAt: new Date(),
            modifiedAt: null,
          };

          return User.insertOne(userToRegister).catch((error) => {
            if (error.code === 11000)
              throw new DuplicityError("user already exists");

            throw new SystemError(error.message);
          });
        });
    })
    .then(() => {});
};
