import {registerUser} from './registerUser.js'

try{
    registerUser('PeDorro', 'pe@dorro.com', 'pe', 'pepepe')
}catch (error){
    console.error(error)
}

