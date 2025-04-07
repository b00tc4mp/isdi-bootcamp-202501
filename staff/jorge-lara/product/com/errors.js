class SystemError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export {
    SystemError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    ValidationError,
    AuthorizationError
}

const errors = {
    SystemError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    ValidationError,
    AuthorizationError
}

export default errors;