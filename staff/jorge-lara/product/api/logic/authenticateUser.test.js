import 'dotenv/config'
import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

console.info('TEST authenticateUser');

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userId

            return authenticateUser('admin', '123123123')
                .then(id => userId = id)
                .finally(() => console.assert(typeof userId === 'string', 'userId is a string'))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
