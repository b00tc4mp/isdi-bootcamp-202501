import { toggleLikePost } from './toggleLikePost.js'
import { data } from '../data/index.js'

console.info('TEST toggleLikePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67dfd24735777c20b6ad4138', '67dfe87a7669f5e87f53db45')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())