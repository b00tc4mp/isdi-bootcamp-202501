import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors

/*
Debemos modificarla respecto a la de la app ya que utilizamos información 
del session storage que aquí no tendremos. Ya que el estado de sesión lo maneja
la app.
El getUserName de la API tendrá que recibir el username de la app. Lo tenemos que 
enviar de la app a la api para saber qué usuario es, lo recoja y si lo encuentra me 
devuelve name.
Este id que estamos solicitando sirve para las operaciones privadas (recuperar nombre de usuario, 
recuperar los posts, todo lo que sea interno de la aplicación y personal). Por eso queremos obtener
el id del usuario y guardarlo. Ademas, tenemos lógica que infiere en esta función.
*/
export const getUserName = userId => { //traerá aqui el userId desde la app
        validate.id(userId, 'userId')

        const user = data.users.getById(userId)

        if(!user) throw new NotFoundError ('user not found')

        return user.name
}