"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const com_1 = require("com");
const zod_1 = require("zod");
const isZodError = (error) => error instanceof zod_1.ZodError;
const parsedError = (error) => {
    if (!isZodError(error)) {
        return {
            name: ValidationError.name,
            message: error.message,
        };
    }
};
const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError, AuthorizationError, } = com_1.errors;
const errorHandler = (error, _req, res, _next) => {
    var _a, _b;
    let status = 500;
    switch (true) {
        case error instanceof zod_1.ZodError:
            status = 400;
            break;
        case error instanceof NotFoundError:
            status = 404;
            break;
        case error instanceof CredentialsError ||
            error instanceof AuthorizationError:
            status = 401;
            break;
        case error instanceof ValidationError:
            status = 400;
            break;
        case error instanceof OwnershipError:
            status = 403;
            break;
        case error instanceof DuplicityError:
            status = 409;
            break;
    }
    res.status(status).json({
        error: status === 500
            ? SystemError.name
            : isZodError(error)
                ? (_a = parsedError(error)) === null || _a === void 0 ? void 0 : _a.name
                : error.constructor.name,
        message: isZodError(error) ? (_b = parsedError(error)) === null || _b === void 0 ? void 0 : _b.message : error.message,
    });
};
exports.default = errorHandler;
