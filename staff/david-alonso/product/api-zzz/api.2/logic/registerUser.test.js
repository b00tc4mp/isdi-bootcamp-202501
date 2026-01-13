import { registerUser } from './registerUser.js'

try {
    registerUser('Sara', 'sara@loca.com', 'sareta', '123123123')
} catch (error) {
    console.error(error)
}