const body = new Body()
body.container = document.body
body.container.style.display = 'flex'
body.container.style.justifyContent = 'center'

body.container.style.background = '#e6e6e6'

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
  try {
    home.loadUsername()
    home.loadPosts()

    body.remove(login)
    body.add(home)
  } catch (error) {
    logic.helper.handleError(error)
  }
})

const home = new Home()
//body.add(home)
home.addLogoutClickListener(() => {
  body.remove(home)
  body.add(login)
})

home.addCreatePostClickListener(() => {
  body.remove(home)
  body.add(createPost)
})

const createPost = new CreatePost()
createPost.addCreatePostSubmitListener(() => {
  body.remove(createPost)
  body.add(home)
})

createPost.addCancelClickListener(() => {
  body.remove(createPost)
  body.add(home)
})

// aplicar estilos a todos los 'a' independientemente de si estan inicialmente en el DOM o no
const ANCHORS = [...landing.container.querySelectorAll("a"), ...register.container.querySelectorAll("a"), ...login.container.querySelectorAll("a"), ...home.container.querySelectorAll("a"), ...createPost.container.querySelectorAll("a")]

ANCHORS.forEach((child) => {
  child.style.textDecoration = 'underline'
  child.style.fontWeight = 'bold'
  child.style.cursor = 'pointer'
})

// aplicar estilos a todos los 'button' independientemente de si estan inicialmente en el DOM o no
const BUTTONS = [...landing.container.querySelectorAll("button"), ...register.container.querySelectorAll("button"), ...login.container.querySelectorAll("button"), ...home.container.querySelectorAll("button"), ...createPost.container.querySelectorAll("button")]

BUTTONS.forEach((child) => {
  child.style.borderRadius = '24px'
  child.style.cursor = 'pointer'
  child.style.fontWeight = 'bold'

  child.addEventListener('mouseenter', () => {
    child.style.color = 'grey'
  })

  child.addEventListener('mouseleave', () => {
    child.style.color = 'black'
  })
})