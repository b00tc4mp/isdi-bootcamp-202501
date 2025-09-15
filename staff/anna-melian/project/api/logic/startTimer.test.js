import 'dotenv/config'
import { data } from '../data/index.js'
import { startTimer } from './startTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST startTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let setTime = null
            return startTimer('67ff906120b4f615405196fa', '67ff90b3998f40bc9b4fec28')
                .then(time => setTime = time)
                .finally(() => console.assert(setTime === 50, 'result is time value'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())