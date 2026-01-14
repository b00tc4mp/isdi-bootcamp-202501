import 'dotenv/config'
import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST REGISTER_USER')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return registerUser('Carni Cero', 'carni@cero.com', 'carnicero', 'cacaca')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))

            // return Promise.all([
            //     registerUser('Pepito Grillo', 'pepito@grillo.com', 'pepitogrillo', '123123123'),
            //     registerUser('Pepito Grillo', 'pepito@grillo.com', 'pepitogrillo', '123123123'),
            //     registerUser('Pepito Grillo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
            // ])
        } catch (error) {
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger

    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger

