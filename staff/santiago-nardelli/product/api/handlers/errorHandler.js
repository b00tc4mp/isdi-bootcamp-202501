//Funcion que construye la respuesta de error en base al error que se recibe como parametro en la funcion errorHandler
import { errors } from "com";
import jwt from "jsonwebtoken";

const {
  SystemError,
  ValidateError,
  CredentialsError,
  NotFoundError,
  OwnershipError,
  DuplicityError,
  AuthorizationError,
} = errors;
const { TokenExpiredError, JsonWebTokenError } = jwt;//==> Importo el error JsonWebTokenError de la libreria jsonwebtoken para manejar los errores de token, ya que este error es lanzado cuando el token no es valido o ha expirado. En este caso, lo utilizo para manejar el error de token expirado y el error de token invalido. Si el token es invalido, lanza un error de tipo JsonWebTokenError y si el token ha expirado, lanza un error de tipo TokenExpiredError. Por lo tanto, puedo manejar ambos errores de la misma manera, ya que ambos son errores de token.

export const errorHandler = (error, req, res, next) => {
  console.error(error);

  let status = 500;
  let errorName = SystemError.name;
  let { message } = error; //==> Mensaje de error que se envia al cliente

  if (error instanceof ValidateError) {
    status = 400;
    errorName = error.constructor.name;
  } else if (error instanceof CredentialsError) {
    status = 401;
    errorName = error.constructor.name;
  } else if (error instanceof NotFoundError) {
    status = 404;
    errorName = error.constructor.name;
  } else if (error instanceof OwnershipError) {
    status = 403;
    errorName = error.constructor.name;
  } else if (error instanceof DuplicityError) {
    status = 409;
    errorName = error.constructor.name;
  } else if (error instanceof TokenExpiredError) {
    status = 401;
    errorName = AuthorizationError.name;
    message = "Expired token";
  } else if (error instanceof JsonWebTokenError) {
    status = 401;
    errorName = AuthorizationError.name;
    message = "Invalid token";
  }

  res.status(status).json({ error: errorName, message: message });
};
