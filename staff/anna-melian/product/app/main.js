console.clear()

const body = new Body()
document.body = body.container

body.container.style.background = 'lightcyan'
body.container.style.placeItems = 'center'

var landing = new Landing()
body.add(landing)

var register = new Register()

var login = new Login()

var home = new Home()
