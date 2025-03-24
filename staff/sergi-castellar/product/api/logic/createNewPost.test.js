import { data } from "../data/index.js";
import { createNewPost } from "./createNewPost.js"
//tested
console.info('TEST createNewPost')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let response2 = null

            return createNewPost("67dd9ed19312d9e32d865910", "https://i.ibb.co/9kGvPg4C/victor.png", "quesito quesito")
                .then(response => response2 = response)
                .finally(() => console.assert(typeof response2 === 'undefined', 'response is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())