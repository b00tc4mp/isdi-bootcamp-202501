import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

console.info('TEST getUserName')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let userName
            return getUserName('67dae1cd0a914c7c2ba729a4')
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string')) //con esto comprobamos que fue bien la logica
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error)) //si fallara la conexion o la logica de getUserName vamos a este catch
    .finally(() => data.disconnect())