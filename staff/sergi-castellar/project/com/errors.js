class SystemError extends Error {
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

class CredentialsError extends Error {
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

class ValidationError extends Error {
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

class NoMatchError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotSingleError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotAllowedError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export {
    SystemError,
    DuplicityError,
    CredentialsError,
    NotFoundError,
    ValidationError,
    AuthorizationError,
    NoMatchError,
    NotSingleError,
    NotAllowedError
}

const errors = {
    SystemError,
    DuplicityError,
    CredentialsError,
    NotFoundError,
    ValidationError,
    AuthorizationError,
    NoMatchError,
    NotSingleError,
    NotAllowedError
}

export default errors