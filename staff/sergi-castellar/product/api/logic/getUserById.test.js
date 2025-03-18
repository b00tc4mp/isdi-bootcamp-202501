import { getUserById } from "./getUserById.js"

try {
    const currentUser = getUserById("0078dfd4e3168502717c19a4905d239202")

    console.log('currentUser :>> ', currentUser);
} catch (error) {
    console.error(error);
}