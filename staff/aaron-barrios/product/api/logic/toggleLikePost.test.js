import {data} from '../data/index.js'
import { toggleLikePost } from './toggleLikePost.js'

console.info('TEST TOGGLE_LIKE_POST')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return toggleLikePost('67dad4ed3e909e877bb71239', '67dd86b5fe13d497a3b7425ao')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(()=> data.disconnect())
