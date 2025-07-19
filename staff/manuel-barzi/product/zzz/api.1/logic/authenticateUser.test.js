import { authenticateUser } from './authenticateUser.js'

try {
    const id = authenticateUser('pepitogrillo', '123123123')

    console.log(id)
} catch (error) {
    console.error(error)
}