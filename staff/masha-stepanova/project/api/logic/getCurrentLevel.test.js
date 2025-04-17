import 'dotenv/config'
import { data } from '../data/index.js'
import { getCurrentLevel } from './getCurrentLevel.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getCurrentLevel')

data
  .connect(MONGO_URL, MONGO_DB_TEST)
  .then(() => {
    try {
      let level2

      return getCurrentLevel('67ffc63d85ccbf2713ce0df0')
        .then((level) => (level2 = level))
        .finally(() => {
          console.log(level2)
          console.assert(level2 instanceof Object, 'level2 is an object')
        })
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect())
