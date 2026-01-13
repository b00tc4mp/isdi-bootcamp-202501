
// // ****  BODY
var body = new Body()  // Llamamos al componente creado
body.container = document.body

// // ****  LANDING
var landing = new Landing()
landing.addRegisterClickListener(function () {
    body.remove(landing) // Quita la ventana Landing
    body.add(register)   // Trae la ventana Registro
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
    body.add(register)
})

login.addLoginSubmitListener(function () {
    body.remove(login)
    body.add(home)
})

// // // ****  HOME
var home = new Home()
home.addExitClickListener(function () {
    body.remove(home)
    body.add(login)
})

