import 'dotenv/config'
import { data } from '../data/index.js'
import { getOrdersByUser } from './getOrdersByUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getOrdersByUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let orders2
            return getOrdersByUser('67f8c7b1d4be984ace115f9f')
                .then(orders => orders2 = orders)
                .finally(() => console.assert(orders2 instanceof Array, 'orders2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())