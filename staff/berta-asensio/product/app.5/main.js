console.clear()

var body = new Body()
body.container = document.body

body.container.style.backgroundColor = '#FFD033'
body.container.style.fontFamily = 'nunito'

//LANDING
var landing = new Landing

landing.addRegisterClickListener(function() {
    body.remove(landing)
    body.add(register)
})

landing.addLoginClickListener(function() {
    body.remove(landing)
    body.add(login)
})

body.add(landing) // Esta línea establece que se abra landing como inicio

//REGISTER
var register = new Register()


register.addRegisterSubmitListener(function() {
    body.remove(register)
    body.add(login)
})

//hago lo mismo con el anchor de return:
register.addReturnClickListener(function() {
    body.remove(register)
    body.add(landing)
})

//LOGIN

var login = new Login()

login.addLoginSubmitListener(function() {
    body.remove(login)
    body.add(home)
})

login.addReturnClickListener(function() {
    body.remove(login)
    body.add(register)
})

//HOME

var home = new Home()

home.addLogoutClickListener(function() {
    body.remove(home)
    body.add(landing)
})


