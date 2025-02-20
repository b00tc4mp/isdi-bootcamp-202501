console.log('Hello, App!')

//asign our body
const body = new Body()
body.container = document.body //reemplazo el contenedor del body por el que creo yo

// --- LANDING ---
const landing = new Landing()
landing.addRegisterClickListener(() => {
    body.remove(landing)
    body.add(register)
})
landing.addLoginClickListener(() => {
    body.remove(landing)
    body.add(login)
})
body.add(landing)

//--- REGISTER ---
const register = new Register()
register.addLoginClickListener(() => {
    body.remove(register)
    body.add(login)
})
register.addRegisterSubmitListener(() => {
    body.remove(register)
    body.add(login)
})

//--- LOGIN ---
const login = new Login()
login.addRegisterClickListener(() => {
    body.remove(login)
    body.add(register)
})
login.addLoginSubmitListener(() => {
    home.loadUsername()
    home.loadPosts()

    body.remove(login)
    body.add(home)
})

// ---- HOME ----
const home = new Home()
home.addLogoutClickListener(() => {
    body.remove(home)
    body.add(landing)
})
