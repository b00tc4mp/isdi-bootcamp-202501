import 'dotenv/config'
import { data } from '../data/index.js';
import { deletePost } from './deletePost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deletePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return deletePost('67e68089f5c84b6bb4b3e9da', '67e68089f5c84b6bb4b3e9e1')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

//TODO correct ids