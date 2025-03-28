import 'dotenv/config'
import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST registerUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            // return Promise.all([
            //     registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123'),
            //     registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
            // ])

            // return registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
            return registerUser('Eu Geni', 'eu@geni.com', 'eugeni', '123123123')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    // .catch(console.error)
    .finally(() => data.disconnect())
// .finally(data.disconnect)
