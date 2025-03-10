import { data } from "../data"

export const getPosts = () => {
    const posts = data.posts.getAll()

    const { userId } = data

    const aggregatedPosts = []

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]

        let liked = false

        for (let i = 0; i < post.likes.length && !liked; i++) {
            const id = post.likes[i]

            if (id === userId)
                liked = true
        }


        const aggregatedPost = {
            id: post.id,
            author: post.author,
            image: post.image,
            text: post.text,
            createdAt: new Date(post.createdAt),
            modifiedAt: post.modifiedAt && new Date(post.modifiedAt),
            liked: liked,
            likesCount: post.likes.length,
        }
        aggregatedPosts[aggregatedPosts.length] = aggregatedPost
    }
    return aggregatedPosts.reverse()
}