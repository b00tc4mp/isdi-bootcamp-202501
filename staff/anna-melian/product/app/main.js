console.clear()
const body = new Body()
document.body = body.container
body.container.style.background = 'lightcyan'
body.container.style.placeItems = 'center'

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

    try {
        const name = logic.getUserName()
        home.setGreetingText('Hello, ' + name + '!')

        const posts = logic.getPosts()

        home.setPosts(posts)

        body.remove(login)
        body.add(home)
    } catch (error) {
        console.error(error)

        alert(error.message)
    }

})


var home = new Home()
home.addLogoutClickListener(function () {
    body.remove(home)
    body.add(landing)
})
