//console.clear();

var body = new Body();
document.body = body.container;

var landing = new Landing();
body.add(landing);

landing.addRegisterAnchor(function() {
  body.remove(landing)
  body.add(register)
})
landing.addLoginAnchor(function() {
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

login.addAnchorListener(function(){
  body.remove(login)
  body.add(register)
})

var home = new Home();