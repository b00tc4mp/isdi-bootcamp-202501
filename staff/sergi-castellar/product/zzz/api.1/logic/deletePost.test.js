import { deletePost } from "./deletePost.js"

try {
    const id = deletePost("0078dfd4e3168502717c19a4905d239202", "016a08a5ca989b7be1277c7fc7b1a21cbe")
} catch (error) {
    console.error(error);
}