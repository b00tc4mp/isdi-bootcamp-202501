import 'dotenv/config'
import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

console.info('TEST DELETE_POST')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2

            return deletePost('67e6b6b04219300670bd238d', '67e6bec6bc3b3f33aad986c7')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())