import 'dotenv/config'
import { data, User } from '../data/index.js'
import { addUserCredit } from './addUserCredit.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST addUserCredit')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 

            return addUserCredit('68519d648b50595a2f0352ab', 25)
                .then(result => result2 = result)
                .finally(() => console.assert(typeof result2 === 'number', 'result2 is a number'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
  