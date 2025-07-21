console.clear()

const body = new Body()
body.container = document.body

body.container.style.backgroundColor = '#FFD033'
body.container.style.fontFamily = 'nunito'


const landing = new Landing()

landing.addRegisterClickListener(function() {
    body.remove(landing)
    body.add(register)
})

landing.addLoginClickListener(function() {
    body.remove(landing)
    body.add(login)
})

body.add(landing) 


const register = new Register()

register.addRegisterSubmitListener(function() {
    body.remove(register)
    body.add(login)
})


register.addReturnClickListener(function() {
    body.remove(register)
    body.add(landing)
})


const login = new Login()

login.addLoginSubmitListener(function() {
    home.loadUserName() 
    home.loadPosts() 
        
    body.remove(login)
    body.add(home)
})

login.addReturnClickListener(function() {
    body.remove(login)
    body.add(register)
})


const home = new Home()

home.addLogoutClickListener(function() {
    body.remove(home)
    body.add(landing)
})


