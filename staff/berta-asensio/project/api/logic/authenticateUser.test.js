import 'dotenv/config'
import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST authenticateUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userId

            return authenticateUser('foca@fucsia.com', '123123aa')
                .then(id => userId = id)
                .finally(() => console.assert(typeof userId === 'string', 'userId is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())