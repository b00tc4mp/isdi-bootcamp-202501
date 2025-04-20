import 'dotenv/config'
import { data } from '../data/index.js'
import { getUser } from './getUser.js'

const { MONGO_URL, MONGO_DB_TEST } = process.env

console.info('TEST getUser')

data
  .connect(MONGO_URL, MONGO_DB_TEST)
  .then(() => {
    try {
      let user2

      return getUser('6804d44b6b53c2ae31fc4660')
        .then((user) => (user2 = user))
        .finally(() => {
          console.log(user2)
          console.assert(user2 instanceof Object, 'user2 is an object')
        })
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))
  .finally(() => data.disconnect())
