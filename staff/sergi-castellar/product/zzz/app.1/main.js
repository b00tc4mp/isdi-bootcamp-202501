console.clear();

var body = new Body();
body.container = document.body;
body.container.style.display = 'flex'
body.container.style.justifyContent = 'center'

body.container.style.background = '#e6e6e6'

var landing = new Landing();
landing.addRegisterClickListener(function () {
  body.remove(landing)
  body.add(register)
})
landing.addLoginClickListener(function () {
  body.remove(landing)
  body.add(login)
})
body.add(landing);

var register = new Register();
register.addLoginClickListener(function () {
  body.remove(register)
  body.add(login)
})
register.addRegisterSubmitListener(function () {
  body.remove(register);
  body.add(login);
})

var login = new Login();
login.addRegisterClickListener(function () {
  body.remove(login)
  body.add(register)
})

login.addLoginSubmitListener(function () {
  try {
    var userId = logic.getUserId()
    var username = logic.getUserUsername(userId)

    home.setWelcomeText(`Welcome, ${username}!`)

    var posts = logic.getPosts()

    home.setPosts(posts)

    body.remove(login);
    body.add(home);
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
})

var home = new Home();
//body.add(home)
home.addLogoutClickListener(function () {
  body.remove(home)
  body.add(login)
})

home.addCreatePostClickListener(function () {
  body.remove(home)
  body.add(create)
})

var create = new Create()
create.addCreatePostSubmitListener(function () {
  body.remove(home)
  body.add(create)
})

// aplicar estilos a todos los 'a' independientemente de si estan inicialmente en el DOM o no
const ANCHORS = [...landing.container.querySelectorAll("a"), ...register.container.querySelectorAll("a"), ...login.container.querySelectorAll("a")]

ANCHORS.forEach(function (child) {
  child.style.textDecoration = 'underline'
  child.style.fontWeight = 'bold'
  child.style.cursor = 'pointer'
})

// aplicar estilos a todos los 'button' independientemente de si estan inicialmente en el DOM o no
const BUTTONS = [...landing.container.querySelectorAll("button"), ...register.container.querySelectorAll("button"), ...login.container.querySelectorAll("button"), ...home.container.querySelectorAll("button")]

BUTTONS.forEach(function (child) {
  child.style.borderRadius = '24px'
  child.style.cursor = 'pointer'
  child.style.fontWeight = 'bold'

  child.addEventListener('mouseenter', function () {
    child.style.color = 'grey'
  })

  child.addEventListener('mouseleave', function () {
    child.style.color = 'black'
  })
})