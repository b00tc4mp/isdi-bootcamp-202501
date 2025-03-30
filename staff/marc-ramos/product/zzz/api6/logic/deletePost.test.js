import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return deletePost('67dab819946509559c3fa81e', '67dae158946509559c3fa822')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
