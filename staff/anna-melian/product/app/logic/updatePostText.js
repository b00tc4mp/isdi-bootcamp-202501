import { data } from "../data"
import { NotFoundError, OwnershipError } from "../errors"
import { validate } from "./validate"


export const updatePostText = (myPost, text) => {
    validate.id(myPost.id, 'postId')

    validate.text(text, 'text')

    const posts = data.posts.getAll()
    const { userId } = data


    const post = data.posts.getById(myPost.id)

    if (!post) throw new NotFoundError('Post not found')

    if (post.author.id !== userId) throw new OwnershipError('user is not author of post')


    if (post.text === text) {
        return false
    }

    post.text = text
    post.modifiedAt = new Date

    data.posts.updateOne(post)

    return true

}