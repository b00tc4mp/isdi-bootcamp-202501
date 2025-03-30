import 'dotenv/config'
import { data } from "../data/index.js";
import { deletePost } from "./deletePost.js"
//tested
const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST deletePost')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let response2 = null

            return deletePost("67dd9ed19312d9e32d865910", "67e59635ec369c72aa95299a")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined), 'response is undefined')
        } catch (error) {
            console.error(error);
        }
    })

    .catch(error => console.error(error))
    .finally(() => data.disconnect())