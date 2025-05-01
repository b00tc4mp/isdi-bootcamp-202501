"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const com_1 = require("com");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = __importDefault(require("../loggers/index.js"));
const { logger } = index_js_1.default;
const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken_1.default;
const { CredentialsError, AuthorizationError, OwnershipError, DuplicityError, SystemError, ValidationError, NotFoundError, OverlapError, } = com_1.errors;
const errorHandler = (error, _req, res, _next) => {
    console.error(error);
    let status = 500;
    let errorName = SystemError.name;
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
        case error instanceof DuplicityError || error instanceof OverlapError:
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
        case error instanceof zod_1.ZodError:
            status = 400;
            errorName = ValidationError.name;
            message = error.errors.map((error) => error.message).join(", ");
            break;
    }
    res.status(status).json({ error: errorName, message });
    logger.error(error);
};
exports.default = errorHandler;
