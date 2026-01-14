import 'dotenv/config'
import { data } from '../../data/index.js'
import { updateVehicle } from './updateVehicle.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST updateVehicle')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let response2 = null
            return updateVehicle("67dd9ed19312d9e32d865910", "Honda", "CBR 600", 2024, "rojo", "2563FVG", 25000, new Date('2025-01-01T00:00:00.000Z'), "67dd9ed19312d9e32d86d458")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined, 'response is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())