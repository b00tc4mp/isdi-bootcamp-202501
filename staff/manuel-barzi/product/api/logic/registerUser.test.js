import { data } from '../data/index.js';
import { registerUser } from './registerUser.js';

console.info('TEST registerUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            // return Promise.all([
            //     registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123'),
            //     registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
            // ])

            return registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
                .then(result => console.assert(result === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    // .catch(console.error)
    .finally(() => data.disconnect())
// .finally(data.disconnect)
