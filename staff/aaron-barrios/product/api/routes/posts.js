import {Router} from 'express'

import {authHandler, withErrorHandling, jsonBodyParser} from '../handlers/index.js'

import {logic} from '../logic/index.js'

export const posts = Router()

//  ----- GET POSTS METHOD -----
posts.get('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
   const {userId} = req

    return logic.getPosts(userId)
        .then(posts => res.json(posts))
}))


//  ----- CREATEPOST METHOD -----
posts.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId, body: {image, text} } = req

    return logic.createPost(userId, image, text)
        .then(() => res.status(201).send())
}))


//  ----- DELETE POST METHOD-----
posts.delete('/:postId', authHandler,  jsonBodyParser, withErrorHandling((req, res) => {
    const { userId, params: { postId } } = req

    return logic.deletePost(userId, postId)
        .then(() => res.status(204).send())
}))


//  ----- TOGGLE LIKE POST METHOD-----
posts.patch('/:postId/likes', authHandler,  jsonBodyParser, withErrorHandling((req, res) => {
    const { userId, params: { postId } } = req

    return logic.toggleLikePost(userId, postId)
        .then(() => res.status(204).send())
}))


//  ----- UPDATE POST TEXT METHOD-----
posts.patch('/:postId/text', authHandler,  jsonBodyParser, withErrorHandling((req, res) => {
    const { userId, params: { postId }, body: { text } } = req

    return logic.updatePostText(userId, postId, text)
        .then(() => res.status(204).send())
}))