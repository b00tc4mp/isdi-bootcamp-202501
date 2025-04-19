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

      return getCurrentLevel('68025520de86d722972145ee')
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
