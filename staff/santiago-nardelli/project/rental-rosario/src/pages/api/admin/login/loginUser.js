import { User } from '../../../../lib/db/models/index.js';
import { validate, errors } from 'com';
import { createToken } from '../../../../lib/handlers/createToken.js';
import bcrypt from 'bcryptjs';

const { SystemError, AuthorizationError, NotFoundError } = errors;

export const loginUser = async (email, password) => {
  // Validaciones de entrada
  validate.email(email);
  validate.password(password);

  try {
    // Buscar el usuario en la base de datos
    const userLogin = await User.findOne({ email }).lean();
    if (!userLogin) throw new NotFoundError('Usuario no encontrado');

   

    // Comparar las contraseñas
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) throw new AuthorizationError('Contraseña incorrecta');

    // Eliminar la contraseña del objeto usuario
    const { password: _, ...user } = userLogin;

    // Crear el token JWT
    const token = createToken(userLogin._id, userLogin.role);

    // Retornar usuario y token
    return { user, token };
  } catch (error) {
    if (error instanceof AuthorizationError || error instanceof NotFoundError) {
      throw error; // Re-lanzar errores esperados
    }
    throw new SystemError('Error procesando la autenticación'); // Error genérico
  }
};
