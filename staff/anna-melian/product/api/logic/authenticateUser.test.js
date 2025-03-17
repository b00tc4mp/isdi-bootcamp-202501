import { authenticateUser } from './authenticateUser.js'

try {
    const id = authenticateUser('GryffindorSeeker', 'harrypotter123')

    console.log(id)
} catch (error) {
    console.error(error)
}