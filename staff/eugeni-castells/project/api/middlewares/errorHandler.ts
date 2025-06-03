import { Request, Response, NextFunction } from "express";

import { StatusCode } from "./types.js";
import { errors } from "com";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import loggers from "../loggers/index.js";
import { UploadFirebaseError } from "com/errors.js";
import { FirebaseAppError } from "firebase-admin/app";

const { logger } = loggers;
const { JsonWebTokenError, TokenExpiredError } = jwt;

const {
  CredentialsError,
  AuthorizationError,
  OwnershipError,
  DuplicityError,
  SystemError,
  ValidationError,
  NotFoundError,
  OverlapError,
} = errors;

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  let status: StatusCode = 500;
  let errorName: string = SystemError.name;
  let { message } = error;

  switch (true) {
    case error instanceof ValidationError:
      status = 400;
      errorName = error.constructor.name;
      break;
    case error instanceof CredentialsError ||
      error instanceof AuthorizationError:
      status = 401;
      errorName = error.constructor.name;
      break;
    case error instanceof OwnershipError:
      status = 403;
      errorName = error.constructor.name;
      break;
    case error instanceof NotFoundError:
      status = 404;
      errorName = error.constructor.name;
      break;
    case error instanceof DuplicityError ||
      error instanceof OverlapError ||
      error instanceof UploadFirebaseError:
      status = 409;
      errorName = error.constructor.name;
      break;
    case error instanceof TokenExpiredError:
      status = 401;
      errorName = AuthorizationError.name;
      message = "expired JWT";
      break;
    case error instanceof JsonWebTokenError:
      status = 401;
      errorName = AuthorizationError.name;
      message = "invalid JWT signature";
      break;
    case error instanceof ZodError:
      status = 400;
      errorName = ValidationError.name;
      message = error.errors.map((error) => error.message).join(", ");
      break;
  }

  res.status(status).json({ error: errorName, message });

  logger.error(error);
};

export default errorHandler;
