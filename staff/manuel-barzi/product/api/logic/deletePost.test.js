import { data } from '../data/index.js';
import { deletePost } from './deletePost.js'

console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return deletePost('67dd3aacae6eebd29ddf55c7', '67dd4ab79150a8e92caa43a3')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())