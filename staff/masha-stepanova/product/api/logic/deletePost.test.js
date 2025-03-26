import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            return deletePost('67dc24464fb4f765fd5e5a67', '67e41ad11aaefb69aca5db50')
                .then(result => console.assert(result === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

