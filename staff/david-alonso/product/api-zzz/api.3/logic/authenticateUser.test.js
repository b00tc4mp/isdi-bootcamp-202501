import { data } from '../data/index.js'
import { authenticateUser } from './authenticateUser.js'

console.info('TEST authenticateUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let id2

            return authenticateUser('dallen', '123123123')
                .then(id => id2 = id)
                .finally(() => console.assert(typeof id2 === 'string', 'userId is a string'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

