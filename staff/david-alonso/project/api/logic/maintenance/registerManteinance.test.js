import 'dotenv/config'
import { data } from '../../data/index.js'
import { registerManteinance } from './registerManteinance.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST registerManteinance')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let result2 = null

            return registerManteinance('20/04/2025', 'neumaticos', 'cambio de neumaticos')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
