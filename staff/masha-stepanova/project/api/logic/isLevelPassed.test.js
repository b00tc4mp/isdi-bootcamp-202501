import 'dotenv/config'
import { data } from '../data/index.js'
import { isLevelPassed } from './isLevelPassed.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST isLevelPassed')

data.connect(MONGO_URL, MONGO_DB_TEST)
    .then(() => {
        try {
            debugger
            let levelPassed

            return isLevelPassed('67fdfbd12efc0640c9345cdb', '67fdfbd12efc0640c9345cd5', 'num1 + num2')
                .then(isPassed => levelPassed = isPassed)
                .finally(() => {
                    console.assert(levelPassed === true, 'levelPassed is true')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())