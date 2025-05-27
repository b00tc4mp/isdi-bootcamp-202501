import { authenticateUser } from './authenticateUser.js'

/*
-Creamos un trycatch donde se autentifica que el usuario 
exista y me devuelve el id en el caso que si.
*/
try {
    const id = authenticateUser('MayaBee', '123123ss')

    console.log(id)
} catch (error) {
    console.error(error)
}