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

            return isLevelPassed('67ffc63d85ccbf2713ce0dee', '67ffc63d85ccbf2713ce0de9', '18')
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