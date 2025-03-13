import { validate } from "./validate.js";
import { data } from "../data/index.js";
import { CredentialsError, NotFoundError } from "../errors/errors.js";

export const authenticateUser = (email, password) => {
  validate.email(email, "email");
  validate.password(password, "password");

  //metodo de data para buscar un usuario ya logueado
  const found = data.users.findOne((user) => user.email === email);

  if (!found || found.password !== password)
    throw new CredentialsError("invalid credentials");

  if (!found) throw new NotFoundError("user not found");

  return found.id;
};
