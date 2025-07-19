import { data } from '../data/index.js';
import { createPost } from './createPost.js'

console.info('TEST createPost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return createPost('67dd3aacae6eebd29ddf55c7', 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODZpcXVlbWhyaXM1Z2lpenU4c2F1bGh5N2l0M3ZlZGJ4YTF0OWtydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sA67Sa7qtAF8Y/giphy.gif', 'f*ck peter')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

