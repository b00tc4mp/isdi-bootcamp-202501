import { data } from '../data/index.js';
import { registerUser } from './registerUser.js';

console.info('TEST registerUsers')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            return registerUser('John', 'john@doe.com', 'john doe', '123123123')
                .then(result => console.assert(result === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error(error))
    .finally(() => data.disconnect())