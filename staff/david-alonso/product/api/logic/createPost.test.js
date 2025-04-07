import 'dotenv/config'
import { data } from '../data/index.js'
import { createPost } from './createPost.js'

const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST createPost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null

            return createPost('67e9946baa195117fab71239', 'https://img.redbull.com/images/c_crop,w_6048,h_3024,x_0,y_0/c_auto,w_1200,h_630/f_auto,q_auto/redbullcom/2016/04/20/1331789854044_1/jorge-prado-entrenando-en-belgica', 'Red Bull')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())