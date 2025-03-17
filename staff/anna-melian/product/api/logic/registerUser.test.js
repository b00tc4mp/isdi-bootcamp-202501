import { registerUser } from './registerUser.js'

try {
    registerUser('Cedric Diggory', 'cedric@diggory.com', 'hufflyCed', 'hufflepuff', 'HuffleWinning04')
} catch (error) {
    console.error(error)
}