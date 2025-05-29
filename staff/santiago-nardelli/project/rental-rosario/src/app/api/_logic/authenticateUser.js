import { User } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";
import bcrypt from "bcryptjs";

const { SystemError, NotFoundError, CredentialsError } = errors;

export const authenticateUser = (email, password) => {
  // Validaciones de entrada
  validate.email(email);
  validate.password(password);

  return (async () => {
    let user;
    try {
      // Buscar el usuario en la base de datos
      user = await User.findOne({ email }).lean();
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!user) throw new NotFoundError("User not found");

    let match;
    // Comparar las contraseñas
    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!match) throw new CredentialsError("Invalid credentials");

    // Retornar usuario y token
    return { id: user._id.toString(), role: user.role };
  })();
};
