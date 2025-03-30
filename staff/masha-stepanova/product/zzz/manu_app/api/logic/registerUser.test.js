import { registerUser } from './registerUser.js';

try {
    registerUser('Pepito Griilo', 'pepito@grillo.com', 'pepitogrillo', '123123123')
} catch (error) {
    console.error(error)
}