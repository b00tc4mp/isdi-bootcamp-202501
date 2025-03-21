import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

console.info('TEST getUserName')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let userName

            return getUserName('67dc24464fb4f765fd5e5a67')
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
