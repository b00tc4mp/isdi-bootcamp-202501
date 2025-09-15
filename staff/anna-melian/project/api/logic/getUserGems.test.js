import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserGems } from './getUserGems.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserGems')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let userGems

            return getUserGems('6800b51cc1d32b7501453a6e')
                .then(gems => userGems = gems)
                .finally(() => console.assert(typeof userGems === 'number', 'userGems is a number'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
