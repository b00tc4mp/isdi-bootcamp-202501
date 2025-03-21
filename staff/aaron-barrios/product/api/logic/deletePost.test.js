import {data} from '../data/index.js'
import {deletePost} from './deletePost.js'

console.info('TEST DELETE_POST')

data.connect('mongodb://localhost:27017', 'test')
    .then(() => {
        try{
            let result2

            return deletePost('67dc2db36a68ef2c2fd5cf1e', '67dd8595e2df1a2a17426709')
                .then(result => result2 = result)
                .finally(() => console.assert(result2 === undefined, 'result is undefined'))
        }catch(error){
            console.error(error)
        }
    })
    .catch(error => console.error(error))
    .finally(() => data.disconnect())