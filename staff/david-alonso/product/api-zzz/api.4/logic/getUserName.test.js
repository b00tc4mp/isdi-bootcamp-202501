import { data } from '../data/index.js'
import { getUserName } from './getUserName.js'

console.info('TEST getUserName')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let userName

            return getUserName('67dfffb4c9ac469c16209dbf')
                .then(name => userName = name)
                .finally(() => console.assert(typeof userName === 'string', 'userName is a string'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
