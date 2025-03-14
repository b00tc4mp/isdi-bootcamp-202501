class SystemError extends Error {
    constructor(message) {
        super(message);
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message);
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message);
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message);
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

export {
    SystemError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    ValidationError
}