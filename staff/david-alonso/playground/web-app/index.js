const express = require('express')

const server = express()

// const fs = require('fs')

const public = express.static('public')

const formBodyParser = express.urlencoded()
// name=Pepito+Grillo&username=pepitogrillo&password=123123123

const logic = require('./logic.js')

server.use(public)

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})

server.get('/', (req, res) => {
    if (req.headers.cookie?.includes('userId')) {
        res.redirect('/home')

        return
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Landing</title>

                <link rel="icon" type="image/icon"  href="/favicon.ico" >

                <link rel="stylesheet" href="style.css">
            </head>

            <body>
                <a href="/register">Register</a> or <a href="/login">Login</a>
            </body>
        </html>
    `)
})


server.get('/register', (req, res) => {
    if (req.headers.cookie && req.headers.cookie.includes('userId')) {
        res.redirect('/home')

        return
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Register</title>

                <link rel="icon" href="/favicon.ico" type="image/icon">

                <link rel="stylesheet" href="style.css">
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
    if (req.headers.cookie && req.headers.cookie.includes('userId')) {
        res.redirect('/home')

        return
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Login</title>

                <link rel="stylesheet" href="style.css">
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

server.post('/register', formBodyParser, (req, res) => {
    const { name, username, password } = req.body

    try {
        logic.registerUser(name, username, password)

        res.redirect('/login')
    } catch (error) {
        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Register</title>

                <link rel="stylesheet" href="style.css">
            </head>

            <body>
                <form action="/register" method="post">
                    <label for="name">Name</label>
                    <input type="text" name="name" value="${name}">

                    <label for="username">Username</label>
                    <input type="text" name="username" value="${username}">

                    <label for="password">Password</label>
                    <input type="password" name="password">

                    <button type="submit">Register</button>
                </form>

                <p>${error.message}</p>
                
                <a href="/login">Login</a>
            </body>
        </html>
    `)
    }
})

server.post('/login', formBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)

        // console.log('user logged in', userId)

        res.setHeader('Set-Cookie', `userId=${userId}`)

        res.redirect('/home')
    } catch (error) {
        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Login</title>

                <link rel="stylesheet" href="style.css">
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
    //if (!req.headers.cookie || !req.headers.cookie.includes('userId')) {
    if (!req.headers.cookie?.includes('userId')) {
        res.redirect('/')

        return
    }

    try {
        const userId = req.headers.cookie.slice(7)

        const username = logic.getUserName(userId)

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Home</title>

                    <link rel="stylesheet" href="style.css">
                </head>
    
                <body>
                    <h1>Hello, ${username}!</h1>

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

                    <link rel="stylesheet" href="style.css">
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

server.listen(8080, () => console.log('server is up'))