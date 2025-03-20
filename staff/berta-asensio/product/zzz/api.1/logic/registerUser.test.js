import { registerUser } from './registerUser.js'

//TERMINAL: logic.registerUser.test.js

//Probamos el registro de usuario con un trycatch

try {
    registerUser('Scooby Doo', 'Doo Scooby', '123123a', 'scooby@doo.com')
} catch (error) {
    console.error(error)
}