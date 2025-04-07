import 'dotenv/config'
import { data } from "../data/index.js";
import { editPost } from "./editPost.js"
//tested
const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST editPost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let response2 = null
            return editPost("67dd9ed19312d9e32d865910", "67e6bd83a3969ae97a3f4b5a", "bombita")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined, 'response is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())