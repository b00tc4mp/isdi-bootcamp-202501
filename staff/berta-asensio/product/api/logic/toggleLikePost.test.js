import { data } from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'


console.info('TEST toggleLikePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67e054abbbf68415732f51fd', '67e17413437a0ec724f5e262')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

//node logic/toggleLikePost.test.js