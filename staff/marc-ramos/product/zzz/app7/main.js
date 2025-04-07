//console.clear();

var body = new Body();
body.container = document.body

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

login.addSubmitLoginListener(function() {
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

var home = new Home()
home.addHomeLogout(function() {
    body.remove(home)
    body.add(landing)
})