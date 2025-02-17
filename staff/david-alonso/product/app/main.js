
// // ****  BODY
const body = new Body()  // Llamamos al componente creado
body.container = document.body
body.container.style.display = 'flex'
body.container.style.flexDirection = 'column'
body.container.style.alignItems = 'center'
body.container.style.color = 'rgb(255, 136, 0)'


// // ****  LANDING
const landing = new Landing()
// Se ejecuta cuando se pulsa el Anchor de Registro en Landing
landing.addRegisterClickListener(function () {
    body.remove(landing) // Quita la ventana Landing
    body.add(register)   // Trae la ventana Registro
})

// Se ejecuta cuando se pulsa el Anchor de Login en Landing
landing.addLoginClickListener(function () {
    body.remove(landing)
    body.add(login)
})
body.add(landing)

// // ****  REGISTER
const register = new Register()

// Se ejecuta cuando se pulsa el Anchor de Login en Registro
register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})

// Se ejecuta cuando se pulsa el boton de Registro en Registro
register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

// // ****  LOGIN
const login = new Login()

// Se ejecuta cuando se pulsa el Anchor de Registro en Login
login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(register)
})

// Se ejecuta cuando se pulsa el Boton de Login en Login
login.addLoginSubmitListener(function () {
    home.loadUserName()
    home.loadPosts()

    body.remove(login)
    body.add(home)
})

// // // ****  HOME
const home = new Home()

// Se ejecuta cuando se pulsa el Boton de Logout en Home
home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(login)
})

