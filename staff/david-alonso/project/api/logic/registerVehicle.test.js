import 'dotenv/config'
import { data } from '../data/index.js'
import { registerVehicle } from './registerVehicle.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST registerVehicle')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let result2 = null

            return registerVehicle('Honda', 'CBR 600', '2023', 'rojo', '1234ABC', '32500', '2024-05-02T00:00:00.000Z')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
