class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message)
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError,
    SystemError,
    ValidationError,
    AuthorizationError
}

const errors = {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError,
    SystemError,
    ValidationError,
    AuthorizationError
}

export default errors