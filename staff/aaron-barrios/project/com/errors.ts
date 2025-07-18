class NotFoundError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "NotFoundError"
    }
}

class SystemError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "SystemError"
    }
}

class DuplicityError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "DuplicityError"
    }
}

class CredentialsError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "CredentialsError"
    }
}

class OwnershipError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "OwnershipError"
    }
}

class AuthorizationError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "AuthorizationError"
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "ValidationError"
    }
}

class StatusError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "StatusError"
    }
}

const errors = {
    ValidationError,
    AuthorizationError,
    DuplicityError,
    SystemError,
    OwnershipError,
    CredentialsError,
    NotFoundError,
    StatusError
}

export default errors