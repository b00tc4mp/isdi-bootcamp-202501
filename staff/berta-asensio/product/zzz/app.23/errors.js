// creamos una constructora para crear nuevos errores. No tener que depender solo de los que ya vienen con JS

class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
}

//CREDENCIALES son datos privados, la contraseña por ejemplo. Username no lo es xk es publico
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

//Juntamos en esta class todos los errores que son de validación
class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}


export {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError,
    SystemError,
    ValidationError
}