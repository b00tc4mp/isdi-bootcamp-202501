import 'dotenv/config'
import { toggleLikePost } from './toggleLikePost.js'
import { data } from '../data/index.js';

console.info('TEST toggleLikePost');

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null;

            return toggleLikePost('67e04ea43dde14789cf6585c', '67e04ea43dde14789cf6585f')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))

        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())