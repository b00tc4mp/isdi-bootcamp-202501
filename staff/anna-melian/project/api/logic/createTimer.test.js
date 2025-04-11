import 'dotenv/config'
import { data } from '../data/index.js';
import { createTimer } from './createTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createTimer('67f891682903cfec8fd90a55', 70, 'Work')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === 'created', 'result is status = created'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())