console.log('Hello, App!')

var body = new Body()
document.body = body.container

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

var register = new Register()
register.addLoginClickListener(function () {
    body.remove(register)
    body.add(login)
})
register.addRegisterSubmitListener(function () {
    body.remove(register)
    body.add(login)
})

var login = new Login()
login.addRegisterClickListener(function () {
    body.remove(login)
    body.add(register)
})
login.addLoginSubmitListener(function () {
    body.remove(login)
    body.add(home)
})

var home = new Home()