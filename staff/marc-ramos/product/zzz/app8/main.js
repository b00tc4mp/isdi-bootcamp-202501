//console.clear();

var body = new Body();
body.container = document.body

var landing = new Landing();
body.add(landing);

landing.addRegisterClickListener(function() {
  body.remove(landing)
  body.add(register)
})
landing.addLoginClickListener(function() {
  body.remove(landing)
  body.add(login)
})

var register = new Register();

register.addLoginSubmit(function() {
  body.remove(register)
  body.add(login)
})

register.addLoginClickListener(function(){
  body.remove(register)
  body.add(login)
})

var login = new Login()

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

var home = new Home()
home.addLogoutClickListener(function() {
    body.remove(home)
    body.add(login)
})