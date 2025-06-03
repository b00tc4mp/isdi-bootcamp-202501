import { toggleLikePost } from './toggleLikePost.js'
import { data } from '../data/index.js'

console.info('TEST toggleLikePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67dd3aacae6eebd29ddf55c7', '67dd4afc95e0df242e83eecf')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())