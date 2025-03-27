import 'dotenv/config'
import { data } from '../data/index.js'
import { deletePost } from './deletePost.js'

console.info('TEST DELETE_POST')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2

            return deletePost('67e56b76aca435b739796a5c', '67e5802a3832b5c92df2103f')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())