import 'dotenv/config'
import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST registerUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null
            return registerUser('Foca Fucsia', 'foca@fucsia.com', '123123aa')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined') )
        } catch (error ) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(data.disconnect)