import { validate } from './validate.js'
import { data } from '../data/index.js'

import { NotFoundError } from '../errors.js'

export const updateUserProfile = (userId, name, username, email) => {
    validate.id(userId, 'userId')
    validate.text(name, 'postId')
    validate.username(username, 'text')
    validate.email(email, 'text')

    const user = data.users.getById(userId)

    if (!user) throw new NotFoundError('user not found')

    if (user.name !== name || user.username !== username || user.email !== email) {
        user.modifiedAt = new Date
    }
    user.name = name
    user.username = username
    user.email = email

    const posts = data.posts.getAll()

    const updatedPosts = posts.map(post => {
        if (post.author.id === userId) {
            return {
                ...post,
                author: {
                    ...post.author,
                    username: username
                }
            }
        }
        return post
    })

    data.users.updateOne(user => user.id === userId, user)
    data.posts.setAll(updatedPosts)


}