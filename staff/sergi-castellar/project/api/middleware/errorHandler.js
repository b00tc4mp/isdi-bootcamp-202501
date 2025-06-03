import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { CredentialsError, DuplicityError, SystemError, NotFoundError, ValidationError } = errors
const { JsonWebTokenError, TokenExpiredError } = jwt

export const errorHandler = (error, _req, res, _next) => {
    console.error(error)

    let status = 500
    let errorName = SystemError.name
    let { message } = error

    if (error instanceof NotFoundError) {
        status = 404
        errorName = error.constructor.name
    } else if (error instanceof ValidationError) {
        status = 400
        errorName = error.constructor.name
    } else if (error instanceof DuplicityError) {
        status = 409
        errorName = error.constructor.name
    } else if (error instanceof CredentialsError) {
        status = 401
        errorName = error.constructor.name
    } else if (error instanceof TokenExpiredError) {
        status = 401
        errorName = AuthorizationError.name
        message = 'expired JWT'
    } else if (error instanceof JsonWebTokenError) {
        status = 401
        errorName = AuthorizationError.name
        message = 'invalid JWT'
    }

    res.status(status).json({ error: errorName, message })
}