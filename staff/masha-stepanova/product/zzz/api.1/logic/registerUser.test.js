import { registerUser } from './registerUser.js'

try {
    registerUser('Jasmine Princess', 'jasmine@princess.com', 'jasmine', '12345678')
} catch (error) {
    console.error(error)
}