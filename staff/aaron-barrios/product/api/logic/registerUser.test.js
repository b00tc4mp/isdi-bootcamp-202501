import { data } from '../data/index.js'
import {registerUser} from './registerUser.js'

console.info('TEST REGISTER_USER')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try{
            return registerUser('John Doe', 'john@doe.com', 'john', 'jojojo')
                .then(() => console.assert(result === undefined, 'result is undefined'))

            // return Promise.all([
            //     registerUser('Pepito Grillo', 'pepito@grillo.com', 'pepitogrillo', '123123123'),
            //     registerUser('Pepito Grillo', 'pepito@grillo.com', 'pepitogrillo', '123123123'),
            //     registerUser('Pepito Grillo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
            // ])
        }catch (error){
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger

    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger

