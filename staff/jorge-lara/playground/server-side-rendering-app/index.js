const express = require('express');

const server = express();

const PORT = 8080;

const formBodyParser = express.urlencoded();

const logic = require('./logic.js');

server.get('/', (req, res) => {
    if (req.headers.cookie?.includes('userId')) {
        res.redirect('/home')

        return;
    }

    res.send(`
        <!DOCKTYPE html>
        <html>
            <head>
                <title>Landing</title>
            </head>
            
            <body>
                <a href='/register'>Register</a> or <a href='/login'>Login</a>
            </body>
        </html>
    `)
})

server.get('/register', (req, res) => {
    if (req.headers.cookie?.includes('userId')) {
        res.redirect('/home')

        return;
    }

    res.send(`<!DOCTYPE html>
        <html>
            <head>
                <title>Register</title>
            </head>

            <body>
                <form action="/register" method="post">
                    <label for="name">Name</label>
                    <input type="text" name="name">

                    <label for="username">Username</label>
                    <input type="text" name="username">

                    <label for="password">Password</label>
                    <input type="password" name="password">

                    <button type="submit">Register</button>
                </form>
                
                <a href="/login">Login</a>
            </body>
        </html>
        `)
})

server.get('/login', (req, res) => {
    if (req.headers.cookie?.includes('userId')) {
        res.redirect('/home');

        return;
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Login</title>
            </head>

            <body>
                <form action="/login" method="post">
                    <label for="username">Username</label>
                    <input type="text" name="username">

                    <label for="password">Password</label>
                    <input type="password" name="password">

                    <button type="submit">Login</button>
                </form>
                
                <a href="/register">Register</a>
            </body>
        </html>
        `)
})

server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body;

    try {
        const userId = logic.authenticateUser(username, password);

        res.setHeader('Set-Cookie', `userId=${userId}`)

        res.redirect('/home');
    } catch (error) {
        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Login</title>
            </head>

            <body>
                <form action="/login" method="post">
                    <label for="username">Username</label>
                    <input type="text" name="username" value="${username}">

                    <label for="password">Password</label>
                    <input type="password" name="password">

                    <button type="submit">Login</button>
                </form>

                <p>${error.message}</p>
                
                <a href="/register">Register</a>
            </body>
        </html>
            `)
    }
})

server.get('/home', (req, res) => {
    if (!req.headers.cookie?.includes('userId')) {
        res.redirect('/');

        return;
    }

    try {
        const userId = req.headers.cookie.slice(7);

        const name = logic.getUsername(userId);

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Home</title>
                </head>
    
                <body>
                    <h1>Hello, ${name}!</h1>

                     <form action="/logout" method="post">
                        <button type="submit">Logout</button>
                    </form>
                </body>
            </html>
        `)
    } catch (error) {
        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Home</title>
                </head>
    
                <body>
                    <h1>Hello, World!</h1>

                    <p>${error.message}</p>

                     <form action="/logout" method="post">
                        <button type="submit">Logout</button>
                    </form>
                </body>
            </html>
        `)
    }
})

server.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})

server.listen(PORT, () => console.log('server up'))