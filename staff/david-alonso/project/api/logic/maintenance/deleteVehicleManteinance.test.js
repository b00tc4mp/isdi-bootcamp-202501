import 'dotenv/config'
import { data } from '../../data/index.js'
import { deleteVehicleManteinance } from './deleteVehicleManteinance.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST deleteVehicleManteinance')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let response2 = null

            return deleteVehicleManteinance("67dd9ed19312d9e32d865910")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined), 'response is undefined')
        } catch (error) {
            console.error(error);
        }
    })

    .catch(error => console.error(error))
    .finally(() => data.disconnect())
