import { data } from "../data/index.js";
import { validate, errors } from "com";
import bcrypt from "bcryptjs";

const { DuplicityError, SystemError } = errors;
export const registerUser = (name, email, password) => {
  validate.text(name, "name");
  validate.maxLength(name, 20, "name");
  validate.email(email, "email");
  validate.password(password, "password");

  return data.users
    .findOne({ $or: [{ name }, { email }] }) //==> busco en la colección users un documento que tenga el mismo nombre o email con el operador de mongo $or
    .catch(() => {
      throw new SystemError("Error connecting to database");
    })
    .then((user) => {
      if (user) throw new DuplicityError("user already exists");

      return bcrypt.hash(password, 10)
      .catch(() => {
        throw new SystemError("Error connecting to database");
      });
      
    })

    .then((hash) => {
      const user = {
        name: name,
        email: email,
        password: hash,
        createdAt: new Date(),
        status: "active",
        role: "user",
        modifiedAt: null,
      };
      return data.users.insertOne(user).catch(() => {
        if (error.code === 11000)
          throw new DuplicityError("user already exists"); // ==> si el error es de duplicidad de datos, entonces lanzo un error de duplicidad
        throw new SystemError(error.message);
      });
    })
    .then(() => {});
};
/*
db.users.createIndex({email:1},{unique:true})==> crea un índice único en la colección users en el campo email
db.users.createIndex({name:1},{unique:true})==> crea un índice único en la colección users en el campo name

*/
