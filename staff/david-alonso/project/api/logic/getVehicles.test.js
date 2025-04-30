import 'dotenv/config'
import { data } from '../data/index.js'
import { getVehicles } from './getVehicles.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getVehicles')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let vehicles2

            return getVehicles("67dd9ed19312d9e32d865910", "67dd9ed19312d9e32d864217")
                .then(vehicles => vehicles2 = vehicles)
                .finally(() => {
                    console.assert(vehicles2 instanceof Array, 'vehicles is an array')
                    console.log('vehicles2 :>> ', vehicles2);
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
