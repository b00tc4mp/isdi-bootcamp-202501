console.log('Hello, App!')

//asign our body
const body = new Body()
body.container = document.body //reemplazo el contenedor del body por el que creo yo

// --- LANDING ---
var landing = new Landing()
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
var register = new Register()
register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)

    if (register.form && typeof register.form.reset === 'function') {
        register.form.reset();
    }
})
register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

//--- LOGIN ---
var login = new Login()
login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(register)

    if (login.form && typeof login.form.reset === 'function') {
        login.form.reset();
    }
})
login.addLoginSubmitListener(function () {
    body.remove(login)
    body.add(home)
})

// ---- HOME ----
var home = new Home()
home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(landing)
})
