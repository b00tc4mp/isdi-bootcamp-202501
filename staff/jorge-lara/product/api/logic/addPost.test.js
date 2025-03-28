import 'dotenv/config'
import { addPost } from './addPost.js'
import { data } from '../data/index.js'

console.info('TEST addPost');

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        try {
            let result2 = null;

            return addPost('67e3b7de759d2b7079073a7e', 'potatooo', 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())

