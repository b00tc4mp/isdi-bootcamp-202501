import { addPost } from './addPost.js'
import { data } from '../data/index.js'

console.info('TEST addPost');

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null;

            return addPost('67e040020a9939a3b5a6157e', 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg', 'potatooo')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

