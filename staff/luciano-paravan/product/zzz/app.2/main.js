
var body = new Body()
document.body = body.container

//body.container.style.color = '#428A82'
//body.container.style.backgroundColor = '#E0EEEC'
//body.container.style.fontFamily = 'verdana'

// El Main es el que maneja las pantallas de la aplicacion, el apagado y encendido de las pantallas

/* -------------------- Landing ------------------> */
var landing = new Landing()
body.add(landing)

landing.addLoginClickListener(function () {
    body.remove(landing)
    body.add(login)
})

landing.addRegisterClickListener(function () {
    body.remove(landing)
    body.add(register)
})

/* ---------------- REGISTER -------------------> */
var register = new Register

register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})

register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})
// ------------------- Login ------------------>
var login = new Login

login.addLoginSubmitListener(function () {
    body.remove(login)
    body.add(home)
})

login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(register)
})


// ------------------- HOME --------------------->
var home = new Home()











