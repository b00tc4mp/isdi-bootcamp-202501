import { data } from "../data/index.js";
import { deletePost } from "./deletePost.js"
//tested
console.info('TEST deletePost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let response2 = null

            return deletePost("67dd9ed19312d9e32d865910", "67dfee2aa93eceb304d75fd7")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined), 'response is undefined')
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())