import { data } from '../data/index.js'
import { getUserName } from './getUsername.js'

console.info('TEST getUserName')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let username

            return getUserName('67dab7ecaccb3b1fe5b71236')
                .then(name => userName = name)
                .finally(() => console.assert(typeof username === 'string', 'username is a string'));

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
