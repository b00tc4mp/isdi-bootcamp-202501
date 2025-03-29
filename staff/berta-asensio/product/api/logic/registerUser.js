
import { User } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, DuplicityError } = errors

/*
-Creamos y exportamos la función de registerUser y le pasamos sus parámetros.
-Validamos todos los parámetros.
-Se busca en la colección de users si el usuario ya existe verificando si hay un 
email O un username que coincida. FindOne devuelve una promesa que resuelve con el usuario
encontrado o con NULL si no existe.
-Lanzamos un SystemError si hay algun error durante la consulta.
-Si user no ha resultado null, significa que ya existe y se lanza un DuplicityError.
-Si el usuario no existe, se crea un objeto con sus datos.
-Insertamos el nuevo usuario en la base de datos mediante insertOne().
-Si ocurre un error al insertar el usuario (por ejemplo que se registran dos a la vez iguales) se revisa:
    -Si es 11000 (codigo de error de Mongo para duplicados), se lanza duplicity error.
    -Para otros errores, System error.
-Retorno vacío, ya que no necesitamos que devuelva nada.
-Hacemos test: con: logic/registerUser.test.js o levantando api (npm start) y utilizando el otro test:
test/register-user.sh
*/
export const registerUser = (name, username, password, email) => {
    validate.name(name)
    validate.minLength(name, 1, 'name')
    validate.maxLength(name, 20, 'name')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return User.findOne({ $or: [{ email }, { username }] }).lean() //lean apra que nos devuelva el objeto
        .catch(error => { throw new SystemError (error.message) })
        .then(user => {
            if(user) throw new DuplicityError('user already exists')
            
            return bcrypt.hash(password, 10) //hasheamos el password. Como hash es una promesa, debemos ponerle un error
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>{
            const user = {
                name: name, 
                username: username, 
                password: hash, 
                email: email,
                createdAt: new Date(), 
                modifiedAt: null
            }

            return User.create(user)
                .catch(error => {
                    if(error.code === 11000) throw new DuplicityError('user already exists')
                    
                    throw new SystemError(error.message)
                    })
        })

        
        .then(() => { })
}

//node logic/registerUser.test.js