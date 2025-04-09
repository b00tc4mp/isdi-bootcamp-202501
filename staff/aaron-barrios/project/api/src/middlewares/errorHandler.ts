import { Request, Response, NextFunction } from 'express'
// import loggers from '../logs/index.js'

import { StatusCode } from './types.js'
import { errors } from 'com'
// import loggers from '../logs/index.js' // -> FIX
import {ZodError} from 'zod'
import jwt from 'jsonwebtoken'

const { JsonWebTokenError, TokenExpiredError } = jwt

const isZodError = (error: Error): error is ZodError =>
    error instanceof ZodError

const parsedError = (error: Error): unknown => {
    if(isZodError(error)) {
        return {
            name: ValidationError.name,
            message: error.errors.map((error) => error.message).join(', ')
        }
    }
}

const {
    CredentialsError,
    AuthorizationError,
    OwnershipError,
    DuplicityError,
    SystemError,
    ValidationError,
    NotFoundError
} = errors


const errorHandler =
    (
        error: Error,
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        console.error(error)

        let status: StatusCode = 500
        let errorName: string = SystemError.name
        // let { message } = Error //??? fix

        switch (true) {
            case error instanceof ValidationError:
                status = 400
                errorName = error.constructor.name
                break
            case error instanceof CredentialsError || AuthorizationError:
                status = 401
                errorName = error.constructor.name
                break
            case error instanceof OwnershipError:
                status = 403
                errorName = error.constructor.name
                break
            case error instanceof NotFoundError:
                status = 404
                errorName = error.constructor.name
                break
            case error instanceof DuplicityError:
                status = 409
                errorName = error.constructor.name
                break
            case error instanceof TokenExpiredError:
                status = 401
                errorName = AuthorizationError //.name??
                // message = 'expired JWT'
                break
            case error instanceof JsonWebTokenError:
                status = 401
                errorName = AuthorizationError //.name??
                // message = 'invalid JWT signature'
                break
        }

        res.status(status).json({
            error: status === 500
                ? SystemError.name
                : isZodError(error)
                    ? parsedError(error) // -> .name FIX
                    : error.constructor.name,
            message: isZodError(error) ? parsedError(error) : error.message //.message -> FIX
        })
    }

export default errorHandler