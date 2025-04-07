//console.clear();

const body = new Body();
body.container = document.body

const landing = new Landing();
body.add(landing);

landing.addRegisterClickListener(function() {
  body.remove(landing)
  body.add(register)
})
landing.addLoginClickListener(function() {
  body.remove(landing)
  body.add(login)
})

const register = new Register();

register.addLoginSubmit(function() {
  body.remove(register)
  body.add(login)
})

register.addLoginClickListener(function(){
  body.remove(register)
  body.add(login)
})

const login = new Login()

login.addRegisterClickListener(function(){
  body.remove(login)
  body.add(register)
})

login.addLoginSubmitListener(function() {
  home.loadUserName()
  home.loadPosts()

  body.remove(login)
  body.add(home)
})

const home = new Home()
home.addLogoutClickListener(function() {
    body.remove(home)
    body.add(login)
})