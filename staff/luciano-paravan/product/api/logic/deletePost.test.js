import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return deletePost('67dc47dd0d2ad27aeb03bb5e', '67e0875ce6ab78206be79b83')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result2 is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())