import 'dotenv/config'
import { data } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js"
//tested
const { MONGO_URL, MONGO_DB } = process.env

console.info('TEST authenticateUser')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let id2

            return authenticateUser("sergi", "123456")
                .then(id => id2 = id)
                .finally(() => {
                    console.assert(id2 !== undefined && typeof id2 === 'string', 'response is not undefined')
                    console.log('id2 :>> ', id2);
                })
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())