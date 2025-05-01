"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlapError = exports.LocationError = exports.AuthorizationError = exports.ValidationError = exports.DuplicityError = exports.SystemError = exports.CredentialsError = exports.NotFoundError = exports.OwnershipError = void 0;
class OwnershipError extends Error {
    constructor(message) {
        super(message);
        this.name = "OwnershipError";
    }
}
exports.OwnershipError = OwnershipError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class LocationError extends Error {
    constructor(message) {
        super(message);
        this.name = "LocationError";
    }
}
exports.LocationError = LocationError;
class CredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "CredentialsError";
    }
}
exports.CredentialsError = CredentialsError;
class DuplicityError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicityError";
    }
}
exports.DuplicityError = DuplicityError;
class SystemError extends Error {
    constructor(message) {
        super(message);
        this.name = "SystemError";
    }
}
exports.SystemError = SystemError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthorizationError";
    }
}
exports.AuthorizationError = AuthorizationError;
class OverlapError extends Error {
    constructor(message) {
        super(message);
        this.name = "OverlapError";
    }
}
exports.OverlapError = OverlapError;
const errors = {
    OwnershipError,
    NotFoundError,
    CredentialsError,
    SystemError,
    DuplicityError,
    ValidationError,
    AuthorizationError,
    LocationError,
    OverlapError,
};
exports.default = errors;
