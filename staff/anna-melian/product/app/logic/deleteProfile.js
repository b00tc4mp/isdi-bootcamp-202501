import { data } from "../data"
import { NotFoundError } from "../errors"


export const deleteProfile = () => {
    const { userId } = data

    const posts = data.posts.getAll()
    const users = data.users.getAll()

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    data.users.deleteOne(user => user.id === userId)


    const remainingPosts = posts.filter(post => post.author.id !== userId)


    const newPosts = remainingPosts.map(post => {
        const updatedLikes = post.likes.filter(id => id !== userId)
        return { ...post, likes: updatedLikes }

    })
    data.posts.setAll(newPosts)
    data.userId = null

}