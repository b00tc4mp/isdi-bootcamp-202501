const express = require('express')

const server = express()

const formBodyParser = express.urlencoded()

const logic = require('./logic.js')

server.get('/', (req, res) => { //landing a pagina de inicio
    //if (req.headers.cookie && req.headers.cookie.includes('userId'))
    if (req.headers.cookie?.includes('userId')) {
        res.redirect('/home')

        return
    }
    //enviamos html con la siguiente estructura
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Landing</title>
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
    //el form con action lo envio a una ruta /register cuando se haga submit con el metodo post
    res.send(`
        <!DOCTYPE html>
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
    if (req.headers.cookie && req.headers.cookie.includes('userId')) {
        res.redirect('/home')

        return
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
//Middleware para parsear el form -> formBodyParser
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

        res.setHeader('Set-Cookie', `userId=${userId}`)

        res.redirect('/home')
    } catch (error) {
        res.send(
            `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Login</title>
                </head>
    
                <body>
                    <form action="/register" method="post">
                        <label for="username">Username</label>
                        <input type="text" name="username" value="${username}">
    
                        <label for="password">Password</label>
                        <input type="password" name="password">
    
                        <button type="submit">Login</button>
                    </form>
    
                    <p>${error.message}</p>
                    
                    <a href="/register">Register</a>
                </body>
            </html>`
        )
    }
})

server.get('/home', (req, res) => {
    try {
        const userId = req.headers.cookie.slice(7) //Cada vez que llamamos al servidor se envia la cabecera cookie, recogemos la cookie de la request

        const name = logic.getUserName(userId)

        //Para hacer un logout hay que hacer un formulario, tenes que llamar a una ruta de logout que sea un post no un get.
        //Las rutas post no quedan guardadas en la memoria del navegador, todo lo que introducis por la url son gets, los post se hacen por detras no los ves, los hace el navegador pero no la url no la ruta del navegador. 
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

server.listen(8080, () => console.log('server is up'))