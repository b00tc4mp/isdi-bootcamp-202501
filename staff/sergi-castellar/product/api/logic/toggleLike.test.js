import 'dotenv/config'
import { data } from "../data/index.js";
import { toggleLike } from "./toggleLike.js"
//tested
const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST toggleLike')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let response2 = null

            return toggleLike("67dd9ed19312d9e32d865910", "67e6bd83a3969ae97a3f4b5a")
                .then(response => response2 = response)
                .finally(() => {
                    console.assert(response2 === undefined), 'response is undefined'
                    console.log('response :>> ', response2)
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())