s
const body = new Body()
body.container = document.body
body.container.style.backgroundImage = "url('https://imgs.search.brave.com/wORb9PxQKXep5pUJuADeoU5HD2PThiYFRqeE6eRAZT4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2IyLzYy/LzA4L2IyNjIwOGE3/ODRhYWVlNTk2NjJl/NTQ3ZjAzZGEwZGM4/LmpwZw')"

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
