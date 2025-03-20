import {data} from '../data/index.js'
import {authenticateUser} from './authenticateUser.js'

console.info('TEST AUTHENTICATE USER')

data.connect('mongodb://localhost:27017', 'test')
.then(() => {
    try{
        let userId

        return authenticateUser('john', 'jojojo')
            .then(id => userId = id)
            .finally(() => console.assert(typeof userId === 'string', 'userId must be a string'))
    }catch(error){
        console.error(error)
    }
})
.catch(error => console.error(error))
.finally(() => data.disconnect())