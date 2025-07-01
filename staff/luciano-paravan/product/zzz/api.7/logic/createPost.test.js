import 'dotenv/config'
import { data } from '../data/index.js';
import { createPost } from './createPost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createPost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createPost('67dadb350a914c7c2ba729a0', 'https://media.giphy.com/media/dyuc5DfSUg1RGg8P3p/giphy.gif?cid=790b76114jsfea4xic4syis6m24941w67l44n2au2280xcjr&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Ok!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())





