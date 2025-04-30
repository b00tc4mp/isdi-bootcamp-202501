import 'dotenv/config'
import { data } from '../data/index.js'
import { updateVehicleManteinance } from './updateVehicleManteinance.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST updateVehicleManteinance')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let response2 = null
            return updateVehicleManteinance(new Date('2024-01-01T00:00:00.000Z'), "Neumaticos", "Cambio de nuematicos")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined, 'response is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())