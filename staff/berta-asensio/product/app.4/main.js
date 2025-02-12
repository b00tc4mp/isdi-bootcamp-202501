console.clear()

var body = new Body()
document.body = body.container

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

body.add(landing) //hace falta?

//REGISTER
var register = new Register()
//desacoplamiento: creamos un método que se encargue de cambiar de página en main, para poder sacarlo de register. Asi aquí llamamos a las variables que estan definidas en esta pagina.
register.addLoginClickListener(function() {
    body.remove(register)
    body.add(login)
})

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
    body.add(landing)
})

//HOME

var home = new Home()

home.addLogOutClickListener(function() {
    body.remove(home)
    body.add(landing)
})


