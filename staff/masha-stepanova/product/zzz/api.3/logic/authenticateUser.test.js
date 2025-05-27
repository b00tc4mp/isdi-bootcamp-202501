import { authenticateUser } from './authenticateUser.js'

try {
    const id = authenticateUser('admin', '12345678')

    console.log(id)
} catch (error) {
    console.error(error)
}