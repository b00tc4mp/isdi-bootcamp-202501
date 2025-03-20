import {data} from '../data/index.js'
import {getUsername} from './getUsername.js'

data.connect('mongodb://127.0.0.1:27017', 'test')
    .then(() => {
        try{
            let username

            return getUsername('67dc2db36a68ef2c2fd5cf1e')
                .then(name =>  username = name)
                .finally(() => console.assert(typeof username === 'string', 'username must be a string'))
        }catch(error){
            console.error(error)
        }
    })
    // .catch(error => console.error(error)) => can be breakpointed on debugger
    .catch(console.error)           // cant be breakpointed on debugger

    // .finally(() => data.disconnect()) => can be breakpointed on debugger
    .finally(data.disconnect)       // cant be breakpointed on debugger