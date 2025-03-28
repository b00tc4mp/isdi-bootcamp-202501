import 'dotenv/config'
import express, { json } from 'express';
import cors from 'cors';
import { errors } from 'com';
import jwt from 'jsonwebtoken';

import { data } from './data/index.js';
import { logic } from './logic/index.js';

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors;

const { JWT_SECRET, PORT, MONGO_URL, MONGO_DB } = process.env;

const withErrorHandling = callback => {
    return (req, res, next) => {
        try {
            callback(req, res)
                .catch(error => next(error))
        } catch (error) {
            next(error);
        }
    }
}

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        const api = express();

        const jsonBodyParser = json();

        api.use(cors());

        api.get('/', (res) => {
            res.send('Hello API!');
        })

        api.post('/users', jsonBodyParser, withErrorHandling((req, res) => {
            const { name, email, username, password } = req.body;

            return logic.registerUser(name, email, username, password)
                .then(() => res.status(201).send())
        }))

        api.post('/users/auth', jsonBodyParser, withErrorHandling((req, res) => {
            const { username, password } = req.body;

            return logic.authenticateUser(username, password)
                .then(id => {
                    const token = jwt.sign({ sub: id }, JWT_SECRET);

                    res.json({ token });
                })
        }))

        api.get('/users/self/name', withErrorHandling((req, res) => {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET);

            return logic.getUserName(userId)
                .then(name => res.json({ name }))
        }))

        //Create post
        api.post('/posts', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET);

            const { text, url } = req.body;

            return logic.addPost(userId, text, url)
                .then(() => res.status(201).send())

        }))

        //getPosts
        api.get('/posts', withErrorHandling((req, res) => {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET);

            return logic.getPosts(userId)
                .then(posts => res.json(posts))

        }))

        api.delete('/posts/:postId', withErrorHandling((req, res) => {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET);

            const { postId } = req.params;

            return logic.deletePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        api.patch('/posts/:postId/likes', withErrorHandling((req, res) => {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET);

            const { postId } = req.params;

            return logic.toggleLikePost(userId, postId)
                .then(() => res.status(204).send())
        }))

        api.patch('/posts/:postId/text', jsonBodyParser, withErrorHandling((req, res) => {
            const { authorization } = req.headers;

            const token = authorization.slice(7);

            const { sub: userId } = jwt.verify(token, JWT_SECRET);

            const { postId } = req.params;

            const { text } = req.body;

            return logic.updatePostText(userId, postId, text)
                .then(() => res.status(204).send())
        }))

        const errorHandler = (error, req, res, next) => {
            let status = 500;
            let errorName = SystemError.name;

            if (error instanceof ValidationError) {
                status = 400;
                errorName = error.constructor.name;
            } else if (error instanceof CredentialsError) {
                status = 401;
                errorName = error.constructor.name;
            } else if (error instanceof OwnershipError) {
                status = 403;
                errorName = error.constructor.name;
            } else if (error instanceof NotFoundError) {
                status = 404;
                errorName = error.constructor.name;
            } else if (error instanceof DuplicityError) {
                status = 409;
                errorName = error.constructor.name;
            }

            res.status(status).json({ error: errorName, message: error.message })
        }

        api.use(errorHandler);

        api.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        })
    })
