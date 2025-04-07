import { toggleLikePost } from './toggleLikePost.js'
import { data } from '../data/index.js'

console.info('TEST toggleLikePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67dc479bdc839d93c260b103', '67dd88fb150062b2bb14db0c')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
