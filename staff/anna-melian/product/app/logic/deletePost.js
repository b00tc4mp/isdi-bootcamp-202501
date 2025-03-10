import { data } from "../data"
import { validate } from "./validate"
import { NotFoundError, OwnershipError } from "../errors"

export const deletePost = postId => {

    validate.id(postId, 'postId invalid length')

    const { userId } = data
    const foundPost = data.posts.findOne(post => post.id === postId)

    if (!foundPost) throw new NotFoundError('post not found')

    if (foundPost.author.id !== userId) throw new OwnershipError('user is not author of post')

    data.posts.deleteOne(post => post.id === postId)

}