console.log('Hello, App!')

//asign our body
const body = new Body()
body.container = document.body //reemplazo el contenedor del body por el que creo yo

// --- LANDING ---
const landing = new Landing()
landing.addRegisterClickListener(function () {
    body.remove(landing)
    body.add(register)
})
landing.addLoginClickListener(function () {
    body.remove(landing)
    body.add(login)
})
body.add(landing)

//--- REGISTER ---
const register = new Register()
register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})
register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

//--- LOGIN ---
const login = new Login()
login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(register)
})
login.addLoginSubmitListener(function () {
    home.loadUsername()
    home.loadPosts()

    body.remove(login)
    body.add(home)
})

// ---- HOME ----
const home = new Home()
home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(landing)
})
