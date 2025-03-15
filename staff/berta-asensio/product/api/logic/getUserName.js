import { data } from '../data/index.js'
import { validate } from './validate.js' //debemos importar validate ya que ahora pasamos userId por la función para recibirlo de la app y hay que validarla.
import { NotFoundError } from '../errors.js'

/*
Debemos modificarla respecto a la de la app ya que utilizamos información 
del session storage que aquí no tendremos. Ya que el estado de sesión lo maneja
la app.
El getUserName de la API tendrá que recibir el username de la app. Lo tenemos que 
enviar de la app a la api para saber qué usuario es, lo recoja y si lo encuentra me 
devuelve name.
*/
export const getUserName = userId => { //traerá aqui el userId desde la app
        validate.id(userId, 'userId')

        const found = data.users.getById(userId)

        if(!found) throw new NotFoundError ('user not found')

        return found.name
}