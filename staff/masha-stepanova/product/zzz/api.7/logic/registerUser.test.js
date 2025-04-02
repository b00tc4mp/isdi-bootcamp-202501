import 'dotenv/config'
import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST registerUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            return registerUser('Jasmine Princess', 'jasmine@princess.com', 'jasmine', '123456789')
                .then(result => console.assert(result === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

