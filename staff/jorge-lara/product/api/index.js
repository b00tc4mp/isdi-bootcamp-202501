import express, { json } from 'express';
import cors from 'cors';
import { errors } from 'com';

import { data } from './data/index.js';
import { logic } from './logic/index.js';

const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError } = errors;

data.connect('mongodb://localhost:27017', 'test')
    .catch(console.error)
    .then(() => {
        const api = express();

        const PORT = 8080;

        const jsonBodyParser = json();

        api.use(cors());

        api.get('/', (req, res) => {
            res.send('Hello API!');
        })

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, email, username, password } = req.body;

                logic.registerUser(name, email, username, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        console.error(error);

                        let status = 500;
                        let errorName = SystemError.name;

                        if (error instanceof DuplicityError) {
                            status = 409;
                            errorName = error.constructor.name;
                        }

                        res.status(status).json({ error: errorName, message: error.message });
                    })

            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                }

                res.status(status).json({ error: errorName, message: error.message });
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body;

                logic.authenticateUser(username, password)
                    .then(id => res.json({ id }))
                    .catch(error => {
                        console.error(error);

                        let status = 500;
                        let errorName = SystemError.name;

                        if (error instanceof CredentialsError) {
                            status = 401;
                            errorName = error.constructor.name;
                        } else if (error instanceof NotFoundError) {
                            status = 404;
                            errorName = error.constructor.name;
                        }

                        res.status(status).json({ error: errorName, message: error.message });
                    })

            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                }

                res.status(status).json({ error: errorName, message: error.message });
            }
        })

        api.get('/users/self/name', (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                logic.getUserName(userId)
                    .then(name => res.json({ name }))
                    .catch(error => {
                        console.error(error);

                        let status = 500;
                        let errorName = SystemError.name;

                        if (error instanceof NotFoundError) {
                            status = 404;
                            errorName = error.constructor.name;
                        }

                        res.status(status).json({ error: errorName, message: error.message });
                    })

            } catch (error) {
                console.error(error)

                let status = 500
                let errorName = SystemError.name

                if (error instanceof ValidationError) {
                    status = 400
                    errorName = error.constructor.name
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { text, url } = req.body;

                logic.addPost(userId, text, url);

                res.status(201).send();
            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                } else if (error instanceof NotFoundError) {
                    status = 404;
                    errorName = error.constructor.name;
                }

                res.status(status).json({ error: errorName, message: error.message });
            }
        })

        api.get('/posts', (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const posts = logic.getPosts(userId);

                res.json(posts);
            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                } else if (error instanceof NotFoundError) {
                    status = 404;
                    errorName = error.constructor.name;
                }
                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.delete('/posts/:postId', (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { postId } = req.params;

                logic.deletePost(userId, postId);

                res.status(204).send();
            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                } else if (error instanceof OwnershipError) {
                    status = 403;
                    errorName = error.constructor.name;
                } else if (error instanceof NotFoundError) {
                    status = 404;
                    errorName = error.constructor.name;
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { postId } = req.params;

                logic.toggleLikePost(userId, postId);

                res.status(204).send();
            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                } else if (error instanceof NotFoundError) {
                    status = 404;
                    errorName = error.constructor.name;
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers;

                const userId = authorization.slice(6);

                const { postId } = req.params;

                const { text } = req.body;

                logic.updatePostText(userId, postId, text);

                res.status(204).send();
            } catch (error) {
                console.error(error);

                let status = 500;
                let errorName = SystemError.name;

                if (error instanceof ValidationError) {
                    status = 400;
                    errorName = error.constructor.name;
                } else if (error instanceof OwnershipError) {
                    status = 403;
                    errorName = error.constructor.name;
                } else if (error instanceof NotFoundError) {
                    status = 404;
                    errorName = error.constructor.name;
                }

                res.status(status).json({ error: errorName, message: error.message })
            }
        })

        api.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        })
    })
