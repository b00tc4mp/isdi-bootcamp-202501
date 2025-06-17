import 'dotenv/config'
import { data } from '../data/index.js'
import { exitTimer } from './exitTimer.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST exitTimer')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null
            return exitTimer('67ff17125c759231a9c80c52', '67ff17125c759231a9c80c54')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())