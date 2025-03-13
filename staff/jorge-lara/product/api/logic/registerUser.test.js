import { registerUser } from './registerUser.js';

try {
    registerUser('admin2', 'admin2@gmail.com', 'admin2', '123123123')
} catch (error) {
    console.error(error)
}