import 'dotenv/config'
import { data } from '../data/index.js'
import { getGlobalRanking } from './getGlobalRanking.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getGlobalRanking')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let ranking

            return getGlobalRanking('67ffc63d85ccbf2713ce0df0')
                .then(ranking2 => ranking = ranking2)
                .finally(() => {
                    console.log(ranking)
                    console.assert(ranking instanceof Object, 'ranking is an object')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
