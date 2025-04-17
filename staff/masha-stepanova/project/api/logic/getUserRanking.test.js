import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserRanking } from './getUserRanking.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getUserRanking')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let position2

            return getUserRanking('67ffc63d85ccbf2713ce0def')
                .then(position => position2 = position)
                .finally(() => {
                    console.log(position2)
                    console.assert(position2 instanceof Object, 'position2 is an object')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())