/*
import { data } from '../data/index.js'
import { errors, validate } from 'com'

const { NotFoundError } = errors


export const deleteProfile = (userId) => {
    validate.id(userId, 'userId')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    data.users.deleteOne(user => user.id === userId)

    const posts = data.posts.getAll()

    const remainingPosts = posts.filter(post => post.author.id !== userId)


    const newPosts = remainingPosts.map(post => {
        const updatedLikes = post.likes.filter(id => id !== userId)
        return { ...post, likes: updatedLikes }

    })
    data.posts.setAll(newPosts)
    data.userId = null

}

*/

