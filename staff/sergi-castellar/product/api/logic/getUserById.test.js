import { data } from "../data/index.js";
import { getUserById } from "./getUserById.js"
//tested
console.info('TEST getUserById')

data.connect('mongodb://localhost:27017', 'test')
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