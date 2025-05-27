import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { SystemError, CredentialsError, NotFoundError, DuplicityError, AuthorizationError, RangeError } = errors
const { JsonWebTokenError, TokenExpiredError } = jwt;

export const errorHandler = (error, req, res, next) => {

    let status = 500;
    let errorName = SystemError.name;
    let { message } = error;


    if (error instanceof CredentialsError) {
        status = 401;
        errorName = error.constructor.name;
    } else if (error instanceof NotFoundError) {
        status = 404;
        errorName = error.constructor.name;
    } else if (error instanceof DuplicityError) {
        status = 409;
        errorName = error.constructor.name;
    } else if (error instanceof RangeError) {
        status = 409;
        errorName = error.constructor.name;
    } else if (error instanceof TokenExpiredError) {
        status = 401;
        errorName = AuthorizationError.name;
        message = 'invalid JWT';
    } else if (error instanceof JsonWebTokenError) {
        status = 401;
        errorName = AuthorizationError.name;
        message = 'invalid JWT'
    }

    res.status(status).json({ error: errorName, message })
}