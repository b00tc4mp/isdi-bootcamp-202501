declare class NotFoundError extends Error {
    constructor(message: string);
}
declare class SystemError extends Error {
    constructor(message: string);
}
declare class DuplicityError extends Error {
    constructor(message: string);
}
declare class CredentialsError extends Error {
    constructor(message: string);
}
declare class OwnershipError extends Error {
    constructor(message: string);
}
declare class AuthorizationError extends Error {
    constructor(message: string);
}
declare class ValidationError extends Error {
    constructor(message: string);
}
declare class StatusError extends Error {
    constructor(message: string);
}
declare const errors: {
    ValidationError: typeof ValidationError;
    AuthorizationError: typeof AuthorizationError;
    DuplicityError: typeof DuplicityError;
    SystemError: typeof SystemError;
    OwnershipError: typeof OwnershipError;
    CredentialsError: typeof CredentialsError;
    NotFoundError: typeof NotFoundError;
    StatusError: typeof StatusError;
};
export default errors;
