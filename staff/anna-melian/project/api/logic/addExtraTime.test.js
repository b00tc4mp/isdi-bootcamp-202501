import 'dotenv/config'
import { data } from '../data/index.js'
import { addExtraTime } from './addExtraTime.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST addExtraTime')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let timeExtra = null

            return addExtraTime('67ff906120b4f615405196fa', '67ff90b3998f40bc9b4fec28', 80)
                .then(result => timeExtra = result)
                .finally(() => console.assert(timeExtra === 15, 'result is extra time value'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())