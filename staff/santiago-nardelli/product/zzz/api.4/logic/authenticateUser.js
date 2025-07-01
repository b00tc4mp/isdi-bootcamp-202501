// File: authenticateUser.js
import { User } from "../data/index.js";
import { errors, validate } from "com";
import bcrypt from "bcryptjs";

const { CredentialsError, NotFoundError, SystemError } = errors;

export const authenticateUser = (email, password) => {
  validate.email(email);
  validate.password(password);

  return User
    .findOne({ email }).lean() //==> busco en la colección users un documento que tenga el mismo email
    // el .lean() me devuelve un objeto plano, sin métodos de mongoose(acelera la consulta)
    .catch(() => {
      throw new SystemError("Error connecting to database");
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return bcrypt
        .compare(password, user.password)
        .catch(() => {
          throw new SystemError("Error connecting to database");
        })
        .then((match) => {
          if (!match) {
            throw new CredentialsError("Wrong credential");
          }
          return user._id.toString();
        });
    });
};
