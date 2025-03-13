import express, { json } from 'express'

import { logic } from './logic/index.js'

import { DuplicityError, NotFoundError, SystemError } from './errors.js';

const api = express();

const PORT = 8080;

const jsonBodyParser = json();

api.get('/hello', (req, res) => {
    res.send('HelloWorld!');
})

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        logic.registerUser(name, email, username, password);

        res.status(201).send();
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof DuplicityError) {
            status = 409;
            errorName = error.constructor.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body;

        const id = logic.authenticateUser(username, password);

        res.json(id);
    } catch (error) {
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
    }
})

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const { userId, text, url } = req.body;

        logic.addPost(userId, text, url);

        res.status(201).send();
    } catch (error) {
        console.error(error);

        let status = 500;
        let errorName = SystemError.name;

        if (error instanceof DuplicityError) {
            status = 409;
            errorName = error.constructor.name;
        }

        res.status(status).json({ error: errorName, message: error.message });
    }
})

api.get('/posts/:userid', (req, res) => {
    try {
        const { userid } = req.params;

        const posts = logic.getPosts(userid);

        res.send(posts);
    } catch (error) {
        console.error(error);

        res.status(500).send('Error listing posts')
    }
})

api.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})