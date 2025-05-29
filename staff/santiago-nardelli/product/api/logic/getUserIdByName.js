import { User } from "../data/index.js";
import { errors, validate } from "com";

const { NotFoundError, SystemError } = errors;

export const getUserIdByName = (name) => {
  validate.string(name, "name"); // Validar que el nombre sea una cadena válida

  return User
    .findOne({ name }).lean() // Buscar un usuario cuyo nombre coincida
    .catch((error) => {
      throw new SystemError("database error", error.message); // Manejar errores de la base de datos
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found"); // Lanzar error si no se encuentra el usuario

      return user._id.toString(); // Devolver el ID del usuario
    });
};