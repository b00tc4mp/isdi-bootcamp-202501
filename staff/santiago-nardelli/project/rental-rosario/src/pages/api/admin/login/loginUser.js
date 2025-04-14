import {User} from '../../../../lib/db/models/index.js';
import {validate, errors} from "com";
import {createToken} from 'jwt'
import bcrypt from "bcryptjs";


const { SystemError, AuthorizationError, NotFoundError} = errors;

export const loginUser = async (email, password) => {
    // Validaciones
    validate.email(email);
    validate.password(password);

    try{
       // Buscar usuario en la base de datos
      const userLogin = await User.findOne({ email }).lean();
      if (!userLogin) throw new NotFoundError('Usuario no encontrado');

      // Verificar si el usuario está activo
      if (!userLogin.active) throw new AuthorizationError('Usuario no activo');

      // Comparar las contraseñas
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) throw new AuthorizationError('Contraseña incorrecta');

      // Eliminar la contraseña del objeto usuario antes de devolverlo
      const { password: _, ...user } = userLogin;

      // Crear el token JWT
      const token = createToken(userLogin._id, userLogin.role);

      return res.status(200).json({ user, token });
    } catch (error) {
      if (error instanceof AuthorizationError || error instanceof NotFoundError) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}