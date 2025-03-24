import { data } from "../data/index.js";
import { editPost } from "./editPost.js"
//tested
console.info('TEST editPost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let response2 = null
            return editPost("67dd9ed19312d9e32d865910", "67dfee5f7b668ca776039170", "bombita")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined, 'response is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())