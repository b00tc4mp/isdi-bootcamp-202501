import {data} from '../data/index.js'
import {updatePostText} from './updatePostText.js'

console.info('TEST UPDATE_POST_TEXT')

data.connect('mongodb://localhost:27017', 'test')
    .then(()=> {
        try{
            let result2 = null

            return updatePostText('67dad4ed3e909e877bb71239', '67dd86b5fe13d497a3b74259', 'testing')
                .then(result => result2 = result)
                .finally(() => console.log(result2 === undefined, 'result is undefined'))
        }catch(error){
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => data.disconnect())