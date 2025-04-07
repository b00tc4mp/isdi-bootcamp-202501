import 'dotenv/config'
import { getUserPosts } from './getUserPosts.js';
import { data } from '../data/index.js';

console.info('TEST getUserPosts');

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2;

            return getUserPosts('67eb959248fc7f7adec2cc1f', '67eb959248fc7f7adec2cc1e')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts2 is array'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(data.disconnect)
