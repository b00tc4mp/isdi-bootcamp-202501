import 'dotenv/config'
import { data } from '../data/index.js'
import { getTimer } from './getTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let timer2

            return getTimer('67e68089f5c84b6bb4b3e9d0', '67e68089f5c84b6bb4b3e9d0')
                .then(timer => timer2 = timer)
                .finally(() => console.assert(timer2 instanceof Object, 'timer2 is an object'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())