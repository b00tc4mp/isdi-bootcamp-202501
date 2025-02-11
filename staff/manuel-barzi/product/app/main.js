console.clear()
console.log('Hello, App!')

const body = new Body()
document.body = body.container

var landing = new Landing()
body.add(landing)

var register = new Register()

var login = new Login()

var home = new Home()