import { data } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt, { hash } from 'bcryptjs'

const { SystemError, DuplicityError } = errors

export const registerUser = (name, email, username, password) => {
    validate.text(name, 'name')
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    return data.users.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) }) //Catch por si falla/se desconecta la base de datos
        .then(user => {
            if (user) throw new DuplicityError('user already exist') //Si encuentra un usuario con mismo email o username retorna error

            return bcrypt.hash(password, 10)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash => {
            user = {
                name: name,
                email: email,
                username: username,
                password: hash,
                createdAt: new Date(),
                modiedAt: null
            }
            return data.users.insertOne(user)
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists') //Este chatch con el error lo ponemos aca por si se intentan agregar usuarios en simultaneo.

                    throw new SystemError(error.message) //Si es otro error lanzamos un SystemError
                })
        })
        .then(() => { }) //La idea es que en el result que tenemos en el test, no se devuelva nada por eso se devuelve un objeto vacio
    //Porque al trabajar con promesas si pones un return, vas pasando datos de una promesa a otra. Entonces cuando hacemos el test, luego de llamar a la funcion registerUser.js no se puede escapar ningun dato de la logica.

    //Nadie tiene que saber que usa la db de mongo por dentro, la logica tiene que abstraer al sistema de arriba.
}