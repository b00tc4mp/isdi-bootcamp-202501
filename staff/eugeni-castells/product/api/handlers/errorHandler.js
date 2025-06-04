import { errors } from "com";
const {
  DuplicityError,
  ValidationError,
  CredentialsError,
  NotFoundError,
  OwnershipError,
  SystemError,
} = errors;

export const errorHandler = (error, _req, res, _next) => {
  let status = 500;
  let errorName = SystemError.name;

  if (error instanceof DuplicityError) {
    status = 409;
    errorName = error.constructor.name;
  } else if (error instanceof ValidationError) {
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
  }

  res.status(status).json({ error: errorName, message: error.message });
};
