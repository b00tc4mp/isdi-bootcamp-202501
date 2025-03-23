import { updatePostText } from './updatePostText.js'
import { data } from '../data/index.js'

console.info('TEST updatePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null;
            return updatePostText('67e04ea43dde14789cf6585b', '67e04ea43dde14789cf6585e', 'potatoes')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())