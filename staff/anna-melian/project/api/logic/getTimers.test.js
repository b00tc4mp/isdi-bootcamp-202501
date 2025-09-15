import 'dotenv/config'
import { data } from '../data/index.js'
import { getTimers } from './getTimers.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getTimers')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let timers2

            return getTimers('680d0db65b51bb8b579d4e70')
                .then(timers => timers2 = timers)
                .finally(() => console.assert(timers2 instanceof Array, 'timers2 is an array'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())