import 'dotenv/config'
import { getPosts } from './getPosts.js';
import { data } from '../data/index.js';

console.info('TEST getPosts');

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let posts2;
            return getPosts('67e040020a9939a3b5a6157d')
                .then(posts => posts2 = posts)
                .finally(() => console.assert(posts2 instanceof Array, 'posts is array'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())
