import 'dotenv/config'
import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST registeruser')

//Primero se hace la conexion con mongoose, sino no se puede hacer nada
data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return registerUser('Manu Barzi', 'manu@barzi.com', 'manubarzi', '123123123')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

// La logica tiene que devolver una promesa ahora, porque trabajamos con promesas. Pero lo que devuelve tiene que ser un undefined, no tiene que devolver ningun dato.

//Yo espero que registre (con el registerUser) y que el resultado sea undefined ()