import 'dotenv/config'
import { data } from '../data/index.js';
import { deleteTimer } from './deleteTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deleteTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return deleteTimer('67ec4499711dacde62ff0d8b', '67ec4499711dacde62ff0d8e')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

