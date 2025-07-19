import { Router } from 'express'

import { authHandler, withErrorHandling, jsonBodyParser } from '../handlers/index.js'

import { logic } from '../logic/index.js'

export const posts = Router()

posts.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    const { image, text } = req.body

    return logic.createPost(userId, image, text)
        .then(() => res.status(201).send())
}))

posts.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getPosts(userId)
        .then(posts => res.json(posts))
}))

posts.delete('/:postId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { postId } = req.params

    return logic.deletePost(userId, postId)
        .then(() => res.status(204).send())
}))

posts.patch('/:postId/likes', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    const { postId } = req.params

    return logic.toggleLikePost(userId, postId)
        .then(() => res.status(204).send())
}))

posts.patch('/:postId/text', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req

    const { postId } = req.params

    const { text } = req.body

    return logic.updatePostText(userId, postId, text)
        .then(() => res.status(204).send())
}))

