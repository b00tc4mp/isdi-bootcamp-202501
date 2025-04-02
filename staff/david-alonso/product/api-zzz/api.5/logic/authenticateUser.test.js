import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

console.info('TEST authenticateUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let id2

            return authenticateUser('dallen', '123456789')
                .then(id => id2 = id)
                .finally(() => console.assert(typeof id2 === 'string', 'token is a string'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

