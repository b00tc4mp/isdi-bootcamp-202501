import { validate } from "../validate.js";
import { data } from "../../data/data.js";
import { CredentialsError } from "../../errors/errors.js";

export const loginUser = (email, password) => {
  validate.email(email, "email");
  validate.password(password, "password");

  //metodo de data para buscar un usuario ya logueado
  const found = data.users.findOne((user) => user.email === email);

  if (!found || found.password !== password)
    throw new CredentialsError("invalid credentials");

  data.userId = found.id;
};
