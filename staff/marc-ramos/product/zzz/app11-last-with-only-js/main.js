//console.clear();

const body = new Body();
body.container = document.body

const landing = new Landing();
body.add(landing);

landing.addRegisterClickListener(() => {
  body.remove(landing)
  body.add(register)
})
landing.addLoginClickListener(() => {
  body.remove(landing)
  body.add(login)
})

const register = new Register();

register.addLoginSubmit(() => {
  body.remove(register)
  body.add(login)
})

register.addLoginClickListener(() => {
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