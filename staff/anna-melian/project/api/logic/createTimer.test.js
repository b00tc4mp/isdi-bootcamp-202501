import 'dotenv/config'
import { data } from '../data/index.js';
import { createTimer } from './createTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createTimer('67ff906120b4f615405196fa', 70, 5, 'Work')
                .then(result => result2 = result)
                .finally(() => console.assert(typeof result2 === 'string', 'result is a string (timer ID)'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())