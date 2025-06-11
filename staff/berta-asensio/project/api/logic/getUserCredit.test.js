import 'dotenv/config'
import { data } from '../data/index.js'
import { getUserCredit } from './getUserCredit.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserCredit')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let credit2

            return getUserCredit('6849ba396b2e49ac1525251e')
                .then(credit => credit2 = credit)
                .finally(() => {
                    console.assert(typeof credit2 === 'number', 'credit should be a number')
                    console.log(`✅ Credit returned: ${credit2}€`)
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())