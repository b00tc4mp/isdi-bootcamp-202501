import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserName')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userName

            return getUserName('67e98bd3c4c9334450229384')
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string')) //con esto comprobamos que fue bien la logica
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error)) //si fallara la conexion o la logica de getUserName vamos a este catch
    .finally(() => data.disconnect())