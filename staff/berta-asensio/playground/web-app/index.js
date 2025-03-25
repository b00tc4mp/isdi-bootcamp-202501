// SERVIDOR WEB en EXPRESS
/*
Inicialización y configuración del servidor:
-Requerimos express (libreria para crear el servidor)
-Server es la instancia de Express para definir rutas y manejar peticiones HTTP.
-formBodyParser: middleware para parsear datos POST de formularios como nombres y contraseñas.
-express.urlencoded(): middleware que decodifica los datos introducidos en formato url y lo hace comprensible
para javascript. name=Pepito+Grillo&username=pepitogrillo&password=123123123
-Requerimos la lógica.
*/
const express = require('express')

const server = express()

const formBodyParser = express.urlencoded()

const logic = require('./logic.js')

//RUTAS DEL SERVIDOR (LANDING, REGISTER, LOGIN)

/*
LANDING (/)
-/ es la ruta de la página principal:
    -Si el usuario tiene una cookie con un userId, se le redirige a /home.
    -Si no tiene la cookie, muestra enlaces para registrar o iniciar sesión.
*/

server.get('/', (req, res) => {
    if(req.headers.cookie?.includes('userId')) {  // esto es lo mismo que if(req.headers.cookie && req.headers.cookie.includes('userId'))
        res.redirect('/home')

        return
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Landing</title>
            </head>

            <body>
                <a href="/register">Register</> or <a href="/login">Login</a>
            </body>
        </html>
    `)
})

/*
PÁGINA DE REGISTRO
-La ruta /register muestra un formulario de registro:
    -Si el usuario ya tiene userId en las cookies, lo redirige a home.
    -Si no, muestra un formulario para registrar al usuario.
*/

server.get('/register', (req, res) => {
    if(req.headers.cookie?.includes('userId')) {
        res.redirect('/home')

        return
    }

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

                <a href="/">Return</a>
            </body>
        </html>
    `)
})

/*
LOGIN
*/

server.get('/login', (req, res) => {
    if(req.headers.cookie?.includes('userId')) {
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

                <a href="/">Return</a>
            </body>
        </html>               
    `)
})

//PROCESAMIENTO DE FORMULARIOS (REGISTRO E INICIO SESIÓN (POST))

/*
REGISTER
-Se envian los datos de registro, con POST, por la ruta register y parseados.
-Se llama a la lógica pasándole los parámetros para que procese la información.
-Si el registro se efectua, se redirecciona a la ruta de login.
-Si hay algun error, se muestra mensaje de error y se mantiene el formulario con los valores ingresados.
 */
server.post('/register', formBodyParser, (req, res) => {
    const { name, username, password } = req.body
    try {
        logic.registerUser(name, username, password)

        res.redirect('/login')
    } catch(error) {
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

                    <a href="/">Return</a>
                </body>
            </html>
        `)
    }
})

/*
LOGIN
-Se envian los datos de inicio de sesión, con POST, por la ruta login y parseados.
-Se obtienen los valores username y password del cuerpo de la petición.
-Se llama a la lógica pasándole los parámetros para que autentique el usuario:
    -Si el usuario es válido, devuelve si id que se almacena en userId.
    -Si no es válido, lanza un error y se captura en el catch
-Se crea una cookie en el navegador del usuario con el userId: esta cookie permitirá que otras rutas
del servidor reconozcan si el usuario ha iniciado sesión.
-Si el login es exitoso, se redirige al usuario a /home.
-Si el usuario no existe o la contraseña es incorrecta, se entra en el bloque catch:
    -Este captura el error generado en authenticateUser.
    -Muestra nuevamente el formulario de login, conservando el valor de username.
    -Muestra un mensaje de error.
 */
server.post('/login', formBodyParser, (req, res) => {

    const { username, password } = req.body

    try {
        const userId = logic.authenticateUser(username, password)

        res.setHeader('Set-Cookie', `userId=${userId}`) //se establece una cookie que se llamará userId

        res.redirect('/home')
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

                        <a href="/">Return</a>
                    </body>
                </html>
            `)
    }
})

//MANEJO DE LA RUTA /HOME
/*
-req.headers.cookie contiene las cookies enviadas en el navegador.
-Si userId no está incluido en las cookies, se redirige a landing porque
significa que el usuario todavia no ha iniciado sesión o no se ha registrado.

-Como req.headers.cookie es una cadena de texto del estilo "userId=abc1234", slice corta
los 7 primeros caracteres para dejar solo el ID.
-De esta manera obtenemos el userId y los pasaremos por la función de la logica.
-La función de la lógica busca el usuario por su ID en la base de datos.
    -Si el ID es válido, devuelve el nombre del usuario.
-Si el usuario existe, se muestra un mensaje de bienvenida con el nombre del usuario.
-Si la lógica falla, el catch atrapa el error y se muestra un mensaje genérico.
*/
server.get('/home', (req, res) => {

    if (!req.headers.cookie?.includes('userId')) {
        res.redirect('/')

        return
    }

    try {
        const userId = req.headers.cookie.slice(7)

        const name = logic.getUserName(userId)

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
                        <h1>Hello, No One!!</h1>

                        <p>${error.message}</p>

                        <form action="/logout" method="post">
                            <button type="submit">Logout</button>
                        </form>
                    </body>
                </html>
            `)
    }
})

//RUTA PARA LOGOUT: borramos la cookie userId y nos redirige a la ruta de login

server.post('/logout', (req, res) => {
    res.clearCookie('userId')

    res.redirect('/login')
})



server.listen(8080, () => console.log('server is up'))