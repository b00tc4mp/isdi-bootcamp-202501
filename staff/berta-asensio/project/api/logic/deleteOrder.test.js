import 'dotenv/config'
import { data } from '../data/index.js'
import { deleteOrder } from './deleteOrder.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deleteOrder')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return deleteOrder('6841d6fa932bb51df4675b4d', '6841d6fa932bb51df4675b5e')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())