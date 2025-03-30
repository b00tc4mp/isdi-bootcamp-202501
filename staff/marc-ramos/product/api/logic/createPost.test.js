import 'dotenv/config'
import { data } from '../data/index.js'
import { createPost } from './createPost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createPost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createPost('67e6bbb7793f289af9b62dcd', 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493b3690xbfoarr9921bdk2x24sd2k68qp7ytz4n592m&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'pruebaaaa')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())