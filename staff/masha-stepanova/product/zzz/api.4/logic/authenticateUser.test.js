import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

console.info('TEST authentificateUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let userId

            return authenticateUser('arielle', '123456789')
                .then(id => userId = id)
                .finally(() => console.assert(typeof userId === 'string', 'userId is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

