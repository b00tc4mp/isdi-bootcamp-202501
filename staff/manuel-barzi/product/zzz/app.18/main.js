console.log('Hello, App!')

const body = new Body()
body.container = document.body

const landing = new Landing()
landing.addRegisterClickListener(() => {
    body.remove(landing)
    body.add(register)
})
landing.addLoginClickListener(() => {
    body.remove(landing)
    body.add(login)
})
body.add(landing)

const register = new Register()
register.addLoginClickListener(() => {
    body.remove(register)
    body.add(login)
})
register.addRegisterSubmitListener(() => {
    body.remove(register)
    body.add(login)
})

const login = new Login()
login.addRegisterClickListener(() => {
    body.remove(login)
    body.add(register)
})
login.addLoginSubmitListener(() => {
    home.loadUserName()
    home.loadPosts()

    body.remove(login)
    body.add(home)
})

const home = new Home()
home.addLogoutClickListener(() => {
    body.remove(home)
    body.add(login)
})