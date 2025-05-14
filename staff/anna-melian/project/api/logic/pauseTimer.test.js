import 'dotenv/config'
import { data } from '../data/index.js'
import { pauseTimer } from './pauseTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST pauseTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null
            return pauseTimer('67ff82ba2bb1dd5a56409b1f', '67ff82ba2bb1dd5a56409b21')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())