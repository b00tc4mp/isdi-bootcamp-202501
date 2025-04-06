import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserUsername } from './getUserUsername.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserUsername')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let username2

            return getUserUsername('67e98bd3c4c9334450229384')
                .then(username => username2 = username)
                .finally(() => console.assert(typeof username === 'string', 'username is a string')) //con esto comprobamos que fue bien la logica
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error)) //si fallara la conexion o la logica de getUserUsername vamos a este catch
    .finally(() => data.disconnect())