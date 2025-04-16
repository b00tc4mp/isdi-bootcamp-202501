import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserRankingPosition } from './getUserRankingPosition.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getUserRankingPosition')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            let levels2

            return getUserRankingPosition('67ffc63d85ccbf2713ce0dee')
                .then(levels => levels2 = levels)
                .finally(() => {
                    console.log(levels2)
                    console.assert(levels2 instanceof Array, 'levels2 is an array')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())