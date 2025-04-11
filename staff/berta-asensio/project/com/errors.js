class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message)

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
    ValidationError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    AuthorizationError
}

const errors = {
    SystemError,
    ValidationError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    OwnershipError,
    AuthorizationError
}

export default errors