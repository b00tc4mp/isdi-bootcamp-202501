import 'dotenv/config'
import { data } from '../data/index.js'
import { getVehicleManteinances } from './getVehicleManteinance.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getVehicleManteinances')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let manteinances2

            return getVehicleManteinances("67dd9ed19312d9e32d865910")
                .then(manteinances => manteinances2 = manteinances)
                .finally(() => {
                    console.assert(manteinances2 instanceof Array, 'manteinances is an array')
                    console.log('manteinances2 :>> ', manteinances2);
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
