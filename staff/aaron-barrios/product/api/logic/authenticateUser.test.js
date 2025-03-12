import {authenticateUser} from './authenticateUser.js'

try{
    const user = authenticateUser('pe', 'pepepe')

    console.log(`Authenticated user: ${user}`)
}catch(error){
    console.error(error)
}