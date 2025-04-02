import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return deletePost('67dfffb4c9ac469c16209dbf', '67e009424579dd841fc52165')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())