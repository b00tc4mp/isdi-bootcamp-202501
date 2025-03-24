import { authenticateUser } from './authenticateUser.js'

try {
    const id = authenticateUser('dallen', '123456789')

    console.log(id)
} catch (error) {
    console.error(error)
}