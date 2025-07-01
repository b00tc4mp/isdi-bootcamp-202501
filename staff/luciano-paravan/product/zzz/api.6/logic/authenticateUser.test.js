import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

console.info('TEST authenticateUser')

data.connect('mongodb://localhost:27017', 'test') //Conecto
    .then(() => { //testeo
        try {
            let id2

            return authenticateUser('datazo', '123123123') //el authenticate tiene que devolver un id
                .then(id => id2 = id)
                .finally(() => console.assert(typeof id2 === 'string', 'userId is a string'))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error)) //Si algo va mal en la authenticacion lo lleva a este catch, pero siempre pasa por el finally de arriba. O error de conexion
    .finally(() => data.disconnect())
