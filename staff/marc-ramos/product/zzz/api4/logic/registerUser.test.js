import { registerUser } from './registerUser.js';

try {
    registerUser('Paula', 'paula@galindo.com', 'paulita', '123123123')
} catch (error) {
    console.error(error)
}