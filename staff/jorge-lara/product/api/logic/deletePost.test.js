import { deletePost } from './deletePost.js'
import { data } from '../data/index.js';

console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null;

            return deletePost('67e040020a9939a3b5a6157d', '67e040020a9939a3b5a61582')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
