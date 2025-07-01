import { data } from '../data/index.js'

import { errors } from 'com'
const { NotFoundError } = errors

export const savePost = (postId) => {
    const { users, userId } = data
    let foundUser

    for (let i = 0; i < data.users.length && !foundUser; i++) {
        const user = data.users[i]

        if (data.userId === user.id) {
            foundUser = user
        }
    }
    if (!foundUser) throw new NotFoundError('user not found')

    let savedPostFound = false
    for (let i = 0; i < foundUser.savedPosts.length && !savedPostFound; i++) {
        const savedPost = foundUser.savedPosts[i]

        if (savedPost === postId) {
            savedPostFound = true
        }
    }

    let newSavedPosts = []
    if (!savedPostFound) {
        data.foundUser.savedPosts.push(postId)
    } else {
        for (let i = 0; i < foundUser.savedPosts.length; i++) {
            const post = foundUser.savedPosts[i]

            if (post !== postId) {
                newSavedPosts[newSavedPosts.length] = post
            }
        }

        data.foundUser.savedPost = newSavedPosts
    }
}