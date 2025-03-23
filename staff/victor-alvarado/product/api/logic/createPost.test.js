import { data } from '../data/index.js'
import { createPost } from './createPost.js'

console.info('TEST createPost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let result2 = null

            return createPost('67dfd24735777c20b6ad4138', 'https://media1.tenor.com/m/5zQYFLDd3IIAAAAC/iron-man-ahhh.gif', 'Vamos!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())