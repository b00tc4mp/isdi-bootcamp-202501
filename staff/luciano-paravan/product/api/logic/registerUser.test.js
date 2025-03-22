import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

//Para testear nos tenemos que conectar con Mongo primero, entonces importamos { data }

console.info('TEST registeruser')

//Primero se hace la conexion con Mongo, sino no se puede hacer nada
data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            return registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
                .then(result => console.assert(result === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

// La logica tiene que devolver una promesa ahora, porque trabajamos con promesas. Pero lo que devuelve tiene que ser un undefined, no tiene que devolver ningun dato.

//Yo espero que registre (con el registerUser) y que el resultado sea undefined ()