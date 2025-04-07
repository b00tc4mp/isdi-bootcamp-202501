import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

console.info('TEST authenticateUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let userId

            return authenticateUser('marcramos', '123123123')
                .then(id => userId = id)
                .finally(() => console.assert(typeof userId === 'string', 'userId is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())