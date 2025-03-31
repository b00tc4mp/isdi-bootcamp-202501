import 'dotenv/config'
import { data } from '../data/index.js';
import { createPost } from './createPost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createPost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createPost('67e0c4137d362394168f3917', 'https://media.giphy.com/media/Mylaa4mpiWCUE/giphy.gif?cid=790b7611cm3b41jb3l9qbixjcdb5qxga7nifvz1mkn68gam9&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Beware of the Nargles!')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

