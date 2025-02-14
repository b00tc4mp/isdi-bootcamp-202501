
// // ****  BODY
var body = new Body()  // Llamamos al componente creado
body.container = document.body
body.container.style.display = 'flex'
body.container.style.flexDirection = 'column'
body.container.style.alignItems = 'center'


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
    try {
        const name = logic.getUserName()

        home.setWelcomeText('Hello, ' + name + '!')

        const posts = logic.getPosts()

        home.setPosts(posts)

        body.remove(login)
        body.add(home)
    } catch (error) {
        console.error(error)

        alert(error.message)
    }
})

// // // ****  HOME
var home = new Home()
home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(login)
})

