
// // ****  BODY
var body = new Body()  // Llamamos al componente creado
body.container = document.body

// // ****  LANDING
var landing = new Landing()
landing.addRegisterClickListener(function () {
    body.remove(landing) // Quita el landing
    body.add(register)   // Trae el registro
})

landing.addLoginClickListener(function () {
    body.remove(landing)
    body.add(login)
})
body.add(landing)

// // ****  REGISTER
var register = new Register()
register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})

register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

// // ****  LOGIN
var login = new Login()
login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(home)
})

login.addLoginSubmitListener(function () {
    body.remove(login)
    body.add(home)
})

// // // ****  HOME
var home = new Home()

