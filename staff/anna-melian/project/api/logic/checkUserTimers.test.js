import 'dotenv/config'
import { data } from '../data/index.js';
import { checkUserTimers } from './checkUserTimers.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST checkUserTimers')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return checkUserTimers('68063caf23131296368b53e1')
                .then(result => {
                    result2 = result
                    console.log('Result:', result2)
                })
                .finally(() => console.assert(typeof result2 === 'string' || typeof result2 === 'undefined', 'result is a string (ID) or undefined (not found)')
                )
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())