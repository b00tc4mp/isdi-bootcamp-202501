import { Router } from 'express'
import { jsonBodyParser, withErrorHandling, authHandler } from '../handlers/index.js'
import { logic } from '../logic/index.js'

export const posts = Router()

posts.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getPosts(userId)
        .then(posts => res.json(posts))
}))

posts.post('/new', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { image, text } = req.body
    const { userId } = req

    return logic.createNewPost(userId, image, text)
        .then(() => res.status(201).send())
}))

posts.delete('/delete/:postId', authHandler, withErrorHandling((req, res) => {
    const { postId } = req.params
    const { userId } = req

    return logic.deletePost(userId, postId)
        .then(() => res.status(204).send())
}))

posts.patch('/likes/:postId', authHandler, withErrorHandling((req, res) => {
    const { postId } = req.params
    const { userId } = req

    return logic.toggleLike(userId, postId)
        .then(() => res.status(204).send())
}))

posts.patch('/edit/:postId', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { postId } = req.params
    const { userId } = req
    const { text } = req.body

    return logic.editPost(userId, postId, text)
        .then(res.status(204).send())
}))