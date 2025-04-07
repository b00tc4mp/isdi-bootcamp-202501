import { data } from '../data/index.js'
import { registerUser } from './registerUser.js'

console.info('TEST registerUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try{
            return registerUser('Paula', 'paula@galindo.com', 'paulita', '123123123')
                .then(result => console.assert(result === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())