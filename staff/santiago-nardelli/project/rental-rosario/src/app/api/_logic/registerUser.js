import { User } from "../../../lib/db/models/index.js";
import { validate, errors } from "com";
import bcrypt from "bcryptjs";

const { DuplicityError, SystemError } = errors;

export const registerUser = (name, email, password) => {
  // Validaciones
  validate.name(name, { minLength: 3, maxLength: 50 }, "name");
  validate.email(email, "email");
  validate.password(password, "password", { minLength: 6, maxLength: 50 });

  return (async () => {
    let user;
    let hashedPassword;

    try {
      // Verificar si el usuario ya existe
      user = await User.findOne({ email });
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (user) {
      throw new DuplicityError("User already exists");
    }

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      throw new SystemError(error.message);
    }

    try {
      // Crear el nuevo usuario
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw new SystemError(error.message);
    }
  })();
};
