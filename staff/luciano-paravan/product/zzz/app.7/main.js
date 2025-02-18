
const body = new Body()
body.container = document.body

//body.container.style.color = '#428A82'
//body.container.style.backgroundColor = '#E0EEEC'
//body.container.style.fontFamily = 'verdana'

// El Main es el que maneja las pantallas de la aplicacion, el apagado y encendido de las pantallas

/* -------------------- Landing ------------------> */
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

/* ---------------- REGISTER -------------------> */
const register = new Register

register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})

register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})
// ------------------- Login ------------------>
const login = new Login

login.addRegisterClickListener(function () {
    home.loadUserName()
    home.loadPosts()

    body.remove(login)
    body.add(register)
})

login.addLoginSubmitListener(function () {
    home.loadUserName()
    home.loadPosts()

    body.remove(login)
    body.add(home) 
})

// ------------------- HOME --------------------->
const home = new Home()

home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(landing)
})










