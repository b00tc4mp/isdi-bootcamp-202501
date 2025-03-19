import { authenticateUser } from './authenticateUser.js'

try {
    const id = authenticateUser('arnausots', '123123123')

    console.log(id)
} catch (error) {
    console.error(error)
}