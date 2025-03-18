import { authenticateUser } from "./authenticateUser.js"

try {
    const id = authenticateUser("sergi", "123456")
    console.log('id :>> ', id);
} catch (error) {
    console.error(error);
}