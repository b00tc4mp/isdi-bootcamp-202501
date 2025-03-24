import { data } from "../data/index.js";
import { toggleLike } from "./toggleLike.js"
//tested
console.info('TEST toggleLike')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try {
            let response2 = null

            return toggleLike("67dd9ed19312d9e32d865910", "67dfee5f7b668ca776039170")
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