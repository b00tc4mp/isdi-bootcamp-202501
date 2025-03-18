import { getPosts } from "./getPosts.js"

try {
    const posts = getPosts("00aab75a0a516ca368d5828fea24e14b8b")
    console.log('posts :>> ', posts);
} catch (error) {
    console.error(error);
}