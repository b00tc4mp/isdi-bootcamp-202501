import 'dotenv/config'
import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST authenticateUser')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let id2

            return authenticateUser('jasmine', 'Jasmine1!')
                .then(id => {
                    id2 = id
                    console.log(id2)
                })
                .finally(() => console.assert(typeof id2 === 'string', 'userId is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())