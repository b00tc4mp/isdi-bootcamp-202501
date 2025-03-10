import { data } from "../data"
import { getPosts } from "./getPosts"


export const getOwnPosts = () => {
    const { userId } = data

    const posts = getPosts()
    let ownPosts = []

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]
        if (post.author.id === userId)
            ownPosts.push(post)
    }

    return ownPosts

}