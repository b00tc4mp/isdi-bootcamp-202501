// creamos una constructora para crear nuevos errores. No tener que depender solo de los que ya vienen con JS

class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name //esto se hace por un error de node
    }
}

//CREDENCIALES son datos privados, la contraseña por ejemplo. Username no lo es xk es publico
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

class OwnershipError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

//Juntamos en esta class todos los errores que son de validación
class ValidationError extends Error {
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
    ValidationError
}

/*
-Hasta ahora, en app estamos lanzando errores genéricos y en la api más esspecificos.
Por lo que por ejemplo si registramos un usuario que ya está registrado, en la api 
si que nos saldría duplicity error, pero en la app simplemente nos diria error.message.
-Para lanzar el mismo error que lanza la api en la app, creamos un objeto mapa (errors),
y en este objeto mapeo todas las constructoras y las exporto por defecto. Lo que me permite
que de éste objeto, puede extraer constructoras que importaré en otros ficheros. (en cada
lógica)
*/
const errors = {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    OwnershipError,
    SystemError,
    ValidationError
}

export default errors

// 