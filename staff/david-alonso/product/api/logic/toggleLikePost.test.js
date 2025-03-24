import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

console.info('TEST toggleLikePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67dffc2ca5d644d600b71238', '67dffcbea5d644d600b71239')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))

        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())