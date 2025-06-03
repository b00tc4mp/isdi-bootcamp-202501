import 'dotenv/config'
import { data } from '../data/index.js'
import { createOrder } from './createOrder.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createOrder')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createOrder('683dc7354bfaa03f189defef', '683dc7364bfaa03f189deff8', 'gluten')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())