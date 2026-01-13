import { createNewPost } from "./createNewPost.js"

try {
    createNewPost("0078dfd4e3168502717c19a4905d239202", "https://i.ibb.co/9kGvPg4C/victor.png", "quesito quesito")
} catch (error) {
    console.error(error);
}