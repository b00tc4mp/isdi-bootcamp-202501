import { User } from '../../../../lib/db/models/index.js';
import { validate, errors } from "com";
import bcrypt from "bcryptjs";

const { DuplicityError, SystemError } = errors;

export const registerUser = async (name, email, password) => {
  // Validaciones
  validate.text(name);
  validate.maxLength(name, 20);
  validate.email(email);
  validate.password(password);

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new DuplicityError('User already exists');
    }

    // Encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = {
      name: name,
      email: email,
      password: hash,
    };

    try {
      await User.create(user);
      return { message: 'User registered successfully.' };
    } catch (error) {
      throw new SystemError(error.message);
    }
  } catch (error) {
    throw new SystemError(error.message);
  }
};
