import { getCurrentUser } from "./getCurrentUser.js"

try {
    const currentUser = getCurrentUser("0078dfd4e3168502717c19a4905d239202")

    console.log('currentUser :>> ', currentUser);
} catch (error) {
    console.error(error);
}