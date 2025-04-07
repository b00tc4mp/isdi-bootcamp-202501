import { data } from "../data/index.js";
import { deleteOwnUser } from "./deleteOwnUser.js"
//tested
console.info('TEST deleteOwnUser')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let response2 = null

            return deleteOwnUser("67e074dd3139f56a9f527500")
                .then(response => response2 = response)
                .finally(() => console.assert(response2 === undefined), 'response is undefined')
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())