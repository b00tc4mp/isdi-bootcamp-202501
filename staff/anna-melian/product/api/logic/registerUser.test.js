import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

console.info('TEST registerUser.js')


data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            console.log('run')
            let result2 = null

            return registerUser('Cedric Diggory', 'cedric@diggory.com', 'hufflyCed', 'hufflepuff', 'HuffleWinning04')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
