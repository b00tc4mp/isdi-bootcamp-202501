"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = exports.ValidationError = exports.DuplicityError = exports.SystemError = exports.CredentialsError = exports.NotFoundError = exports.OwnershipError = void 0;
class OwnershipError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.OwnershipError = OwnershipError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class CredentialsError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.CredentialsError = CredentialsError;
class DuplicityError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DuplicityError = DuplicityError;
class SystemError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.SystemError = SystemError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ValidationError = ValidationError;
class AuthorizationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AuthorizationError = AuthorizationError;
const errors = {
    OwnershipError,
    NotFoundError,
    CredentialsError,
    SystemError,
    DuplicityError,
    ValidationError,
    AuthorizationError,
};
exports.default = errors;
