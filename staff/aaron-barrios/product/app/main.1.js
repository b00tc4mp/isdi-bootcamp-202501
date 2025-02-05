console.clear()
console.log('Hello, App!')

//landing
var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

var landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)

//DIV DE ANCHORS 
var linkDiv = document.createElement('span')
linkDiv.style.display = 'flex'
linkDiv.style.justifyContent = 'left'
linkDiv.style.gap = '5px'
landing.appendChild(linkDiv)


var registerLink = document.createElement('a')
registerLink.innerText = 'Register'
registerLink.style.textDecoration = 'underline'
registerLink.style.cursor = 'pointer'
linkDiv.appendChild(registerLink)

registerLink.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(register)
})

var registerLink = document.createElement('text')
linkDiv.appendChild(registerLink)

var registerLinkText = document.createTextNode(' or ')
registerLink.appendChild(registerLinkText)

var loginLink = document.createElement('a')
loginLink.innerText = 'Login'
loginLink.style.textDecoration = 'underline'
loginLink.style.cursor = 'pointer'
linkDiv.appendChild(loginLink)

loginLink.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(login)
})


//register
var register = document.createElement('div')
register.style.width = '400px'
// document.body.appendChild(register)

var registerTitle = document.createElement('h2')
register.appendChild(registerTitle)

var registerText = document.createTextNode('Register')
registerTitle.appendChild(registerText)

var registerForm = document.createElement('form')
registerForm.style.display = 'flex'
registerForm.style.flexDirection = 'column'
registerForm.style.justifyContent = 'left'
registerForm.style.gap = '5px'
register.appendChild(registerForm)

//NAME
var nameLabel = document.createElement('label')
registerForm.appendChild(nameLabel)

var nameLabelText = document.createTextNode('Name')
nameLabel.appendChild(nameLabelText)

var nameInput = document.createElement('input')
nameInput.style.width = '350px'
registerForm.appendChild(nameInput)

//EMAIL
var emailLabel = document.createElement('label')
registerForm.appendChild(emailLabel)

var emailLabelText = document.createTextNode('E-mail')
emailLabel.appendChild(emailLabelText)

var labelInput = document.createElement('input')
labelInput.style.width = '350px'
registerForm.appendChild(labelInput)

//USERNAME
var usernameLabel = document.createElement('label')
registerForm.appendChild(usernameLabel)

var usernameLabelText = document.createTextNode('Username')
usernameLabel.appendChild(usernameLabelText)

var usernameInput = document.createElement('input')
usernameInput.style.width = '350px'
registerForm.appendChild(usernameInput)

//PASSWORD
var passwordLabel = document.createElement('label')
registerForm.appendChild(passwordLabel)

var passwordLabelText = document.createTextNode('Password')
passwordLabel.appendChild(passwordLabelText)

var passwordInput = document.createElement('input')
passwordInput.style.width = '350px'
registerForm.appendChild(passwordInput)


var registerUnder = document.createElement('span')
registerUnder.style.margin = '10px'
registerUnder.style.marginRight = '55px'
registerUnder.style.display = 'flex'
registerUnder.style.justifyContent = 'space-between'
registerUnder.style.alignItems = 'center'
registerUnder.width = '100%'

var logiinLink = document.createElement('a')
logiinLink.innerText = 'Login'
logiinLink.style.textDecoration = 'underline'
logiinLink.style.cursor = 'pointer'
registerUnder.appendChild(logiinLink)

var registerButton = document.createElement('button')
registerButton.type = 'submit'
registerButton.style.width = '80px'
registerUnder.appendChild(registerButton)

registerForm.appendChild(registerUnder)

logiinLink.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(login)
})

registerForm.addEventListener('submit', function (event) {
    event.preventDefault()
    document.body.removeChild(register)
    document.body.appendChild(login)
})

var registerButtonText = document.createTextNode('Register')
registerButton.appendChild(registerButtonText)

//login
var login = document.createElement('div')
login.style.width = '400px'
// document.body.appendChild(login)

var loginTitle = document.createElement('h2')
login.appendChild(loginTitle)

var loginText = document.createTextNode('Login')
loginTitle.appendChild(loginText)

var loginForm = document.createElement('form')
loginForm.style.display = 'flex'
loginForm.style.flexDirection = 'column'
loginForm.style.justifyContent = 'left'
loginForm.style.gap = '5px'
login.appendChild(loginForm)

//USERNAME
var usernameLabel = document.createElement('label')
loginForm.appendChild(usernameLabel)

var usernameLabelText = document.createTextNode('Username')
usernameLabel.appendChild(usernameLabelText)

var usernameInput = document.createElement('input')
usernameInput.style.width = '350px'
loginForm.appendChild(usernameInput)

//PASSWORD
var passwordLabel = document.createElement('label')
loginForm.appendChild(passwordLabel)

var passwordLabelText = document.createTextNode('Password')
passwordLabel.appendChild(passwordLabelText)

var passwordInput = document.createElement('input')
passwordInput.style.width = '350px'
loginForm.appendChild(passwordInput)


var loginUnder = document.createElement('span')
loginUnder.style.margin = '10px'
loginUnder.style.marginRight = '60px'
loginUnder.style.display = 'flex'
loginUnder.style.justifyContent = 'space-between'
login.appendChild(loginUnder)

var regiisterLink = document.createElement('a')
regiisterLink.innerText = 'Register'
regiisterLink.style.textDecoration = 'underline'
regiisterLink.style.cursor = 'pointer'
loginUnder.appendChild(regiisterLink)

var loginButton = document.createElement('button')
loginButton.style.width = '80px'
loginButton.type = 'submit'
loginUnder.appendChild(loginButton)

var loginButtonText = document.createTextNode('Login')
loginButton.appendChild(loginButtonText)


loginForm.appendChild(loginUnder)

regiisterLink.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(register)
})


loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    document.body.removeChild(login)
    document.body.appendChild(home)
})


//home
var home = document.createElement('div')
home.style.width = '400px'
// document.body.appendChild(home)

var logoTitle = document.createElement('h2')
home.appendChild(logoTitle)

var homeText = document.createTextNode('Logo')
logoTitle.appendChild(homeText)

var posts = document.createElement('article')
posts.style.display = 'flex'
posts.style.width = '100%'
posts.style.maxWidth = 'inherit'
posts.style.flexDirection = 'column'
posts.style.gap = '10px'
home.appendChild(posts)

var kiwiPost = document.createElement('img')
kiwiPost.src = 'https://www.nutritionadvance.com/wp-content/uploads/2017/12/whole-kiwi-fruit-and-half-a-kiwi-showing-flesh.jpg'
kiwiPost.style.width = '100%'
kiwiPost.style.height = 'auto'
posts.appendChild(kiwiPost)

var kiwiMojis = document.createElement('span')
kiwiMojis.style.display = 'flex'
kiwiMojis.style.justifyContent = 'left'
kiwiMojis.style.gap = '5px'
posts.appendChild(kiwiMojis)

var likeEmoji = document.createElement('a')
likeEmoji.innerText = '❤️'
kiwiMojis.appendChild(likeEmoji)

var commentEmoji = document.createElement('a')
commentEmoji.innerText = '📃'
kiwiMojis.appendChild(commentEmoji)

var comment = document.createElement('Text')
comment.style.opacity = '60%'
comment.style.color = 'black'
kiwiMojis.appendChild(comment)

var commentText = document.createTextNode('Comment...')
comment.appendChild(commentText)

var bananaPost = document.createElement('img')
bananaPost.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVh4eUU6jtRS9zzlomMGLvWgpua5Xj5IcoQ&s'
bananaPost.style.width = '100%'
bananaPost.style.height = 'auto'
posts.appendChild(bananaPost)

var nanaMojis = document.createElement('span')
nanaMojis.style.display = 'flex'
nanaMojis.style.justifyContent = 'left'
nanaMojis.style.gap = '5px'
posts.appendChild(nanaMojis)

var likeEmoji = document.createElement('a')
likeEmoji.innerText = '❤️'
nanaMojis.appendChild(likeEmoji)

var commentEmoji = document.createElement('a')
commentEmoji.innerText = '📃'
nanaMojis.appendChild(commentEmoji)

var comment = document.createElement('Text')
comment.style.opacity = '60%'
comment.style.color = 'black'
nanaMojis.appendChild(comment)

var commentText = document.createTextNode('Comment...')
comment.appendChild(commentText)


var orangePost = document.createElement('img')
orangePost.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqLw4idW1IdAusBGfdZPewk0HTJyRUzPCPg&s'
orangePost.style.width = '100%'
orangePost.style.height = 'auto'
posts.appendChild(orangePost)

var oraMojis = document.createElement('span')
oraMojis.style.display = 'flex'
oraMojis.style.justifyContent = 'left'
oraMojis.style.gap = '5px'
posts.appendChild(oraMojis)

var likeEmoji = document.createElement('a')
likeEmoji.innerText = '❤️'
oraMojis.appendChild(likeEmoji)

var commentEmoji = document.createElement('a')
commentEmoji.innerText = '📃'
oraMojis.appendChild(commentEmoji)

var comment = document.createElement('Text')
comment.style.opacity = '60%'
comment.style.color = 'black'
oraMojis.appendChild(comment)

var commentText = document.createTextNode('Comment...')
comment.appendChild(commentText)
