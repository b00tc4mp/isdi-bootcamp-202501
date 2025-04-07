import { data } from "../data/index.js";
import { getPosts } from "./getPosts.js"
//tested
console.info('TEST getPosts')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let posts2

            return getPosts("67dd9ed19312d9e32d865910")
                .then(posts => posts2 = posts)
                .finally(() => {
                    console.assert(posts2 instanceof Array, 'posts is an array')
                    console.log('posts2 :>> ', posts2);
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())