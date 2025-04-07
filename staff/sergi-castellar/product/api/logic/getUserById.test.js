import 'dotenv/config'
import { data } from "../data/index.js";
import { getUserById } from "./getUserById.js"
//tested
const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST getUserById')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let user2 = null
            return getUserById("67dd9ed19312d9e32d865910")
                .then(user => user2 = user)
                .finally(() => {
                    console.assert(typeof user2 === 'object'), 'user is an object'

                    console.log('user2 :>> ', user2);
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())