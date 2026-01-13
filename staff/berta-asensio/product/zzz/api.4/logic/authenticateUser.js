// AuthenticateUser = loginUser en app

import { data } from '../data/index.js'
import { errors, validate } from 'com'
import bcrypt from 'bcryptjs'

const { SystemError, NotFoundError, CredentialsError } = errors

/*
-Se declara la función authenticate user y se exporta para poder ser utilizada en otros lugares.
-Se pasan dos parámetros (username y password).
-Se valida que estos parámetros cumplan con ciertos criterios.
-Se busca en la base de datos un usuario en concreto a través de su nombre de usuario.
-Si hay algun error en la búsqueda o la conexión, se lanza un SystemError.
-Happypath: 
        -Entramos en el then, donde user es el objeto que representa al usuario recuperado de la base
        de datos.
        -Si no lo encuentra (es decir, si es null o undefined), se lanza un NotFoundError.
        -Si el usuario exisite, se verifica que coincida con la contraseña proporcionada:
                -En el caso que no coincida, se lanza un CredentialsError.
                -Happypath: si la contraseña coincide, se devuelve el identificador único del usuario
                (user._id) y se devuelve en forma de string.
*/

export const authenticateUser = (username, password) => {
        validate.username(username, 'username')
        validate.password(password, 'password')

        return data.users.findOne({ username })
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                        if(!user) throw new NotFoundError('user not found')
                        
                        return bcrypt.compare(password, user.password)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(match => {
                                        if(!match) throw new CredentialsError('wrong credentials')
                                        
                                        return user._id.toString()
                                })         
                })
}

