import 'dotenv/config'
import { data } from '../data/index.js'
import { createPost } from './createPost.js'

console.info('TEST CREATE_POST')

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .catch(error => console.log(error))
    .then(() => {
        try {
            let result2 = null

            return createPost('67e6b6b04219300670bd238e', 'https://media.giphy.com/media/mx0rj9sZRBcGTwEIX1/giphy.gif?cid=790b7611jpjzxq04grogava3b8n2rdqytpq7cbivyz6vev3a&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'you rock')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger

    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger
