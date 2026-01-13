import { registerUser } from "./registerUser.js"

try {
    registerUser("prueba", "prue@ba.com", "prueba", "123456")
} catch (error) {
    console.error(error);
}