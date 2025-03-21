import {data} from '../data/index.js'
import {authenticateUser} from './authenticateUser.js'

console.info('TEST AUTHENTICATE USER')

data.connect('mongodb://localhost:27017', 'test')
.then(() => {
    try{
        let id2

        return authenticateUser('john', 'jojojo')
            .then(id => id2 = id)
            .finally(() => console.assert(typeof id2 === 'string', 'userId must be a string'))
    }catch(error){
        console.error(error)
    }
})
.catch(error => console.error(error))
.finally(() => data.disconnect())