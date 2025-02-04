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
var linkDiv = document.createElement('div')
linkDiv.style.display = 'flex'
linkDiv.style.flexDirection = 'row'
linkDiv.style.justifyContent = 'left'
linkDiv.style.gap = '5px'
landing.appendChild(linkDiv)


var registerLink = document.createElement('a')
registerLink.innerText = 'Register'
registerLink.href = 'index.html'
linkDiv.appendChild(registerLink)

var registerLink = document.createElement('text')
linkDiv.appendChild(registerLink)

var registerLinkText = document.createTextNode(' or ')
registerLink.appendChild(registerLinkText)

var loginLink = document.createElement('a')
loginLink.innerText = 'Login'
loginLink.href = 'index.html'
linkDiv.appendChild(loginLink)


//register
var register = document.createElement('div')
register.style.width = '4 00px'
document.body.appendChild(register)

var registerTitle = document.createElement('h2')
register.appendChild(registerTitle)

var registerText = document.createTextNode('Register')
registerTitle.appendChild(registerText)

var form = document.createElement('form')
form.style.display = 'flex'
form.style.flexDirection = 'column'
form.style.justifyContent = 'left'
form.style.gap = '5px'
register.appendChild(form)

//NAME
var nameLabel = document.createElement('label')
form.appendChild(nameLabel)

var nameLabelText = document.createTextNode('Name')
nameLabel.appendChild(nameLabelText)

var nameInput = document.createElement('input')
nameInput.style.width = '350px'
form.appendChild(nameInput)

//EMAIL
var emailLabel = document.createElement('label')
form.appendChild(emailLabel)

var emailLabelText = document.createTextNode('E-mail')
emailLabel.appendChild(emailLabelText)

var labelInput = document.createElement('input')
labelInput.style.width = '350px'
form.appendChild(labelInput)

//USERNAME
var usernameLabel = document.createElement('label')
form.appendChild(usernameLabel)

var usernameLabelText = document.createTextNode('Username')
usernameLabel.appendChild(usernameLabelText)

var usernameInput = document.createElement('input')
usernameInput.style.width = '350px'
form.appendChild(usernameInput)

//PASSWORD
var passwordLabel = document.createElement('label')
form.appendChild(passwordLabel)

var passwordLabelText = document.createTextNode('Password')
passwordLabel.appendChild(passwordLabelText)

var passwordInput = document.createElement('input')
passwordInput.style.width = '350px'
form.appendChild(passwordInput)


var registerUnder = document.createElement('div')
registerUnder.style.margin = '10px'
registerUnder.style.marginRight = '60px'
registerUnder.style.display = 'flex'
registerUnder.style.flexDirection = 'row'
registerUnder.style.justifyContent = 'space-between'
register.appendChild(registerUnder)

var logiinLink = document.createElement('a')
logiinLink.innerText = 'Login'
logiinLink.href = 'index.html'
registerUnder.appendChild(logiinLink)

var registerButton = document.createElement('button')
registerButton.style.width = '80px'
registerUnder.appendChild(registerButton)

var registerButtonText = document.createTextNode('Register')
registerButton.appendChild(registerButtonText)

//login
var login = document.createElement('div')
login.style.width = '4 00px'
document.body.appendChild(login)

var loginTitle = document.createElement('h2')
login.appendChild(loginTitle)

var loginText = document.createTextNode('Login')
loginTitle.appendChild(loginText)

var form = document.createElement('form')
form.style.display = 'flex'
form.style.flexDirection = 'column'
form.style.justifyContent = 'left'
form.style.gap = '5px'
login.appendChild(form)

//USERNAME
var usernameLabel = document.createElement('label')
form.appendChild(usernameLabel)

var usernameLabelText = document.createTextNode('Username')
usernameLabel.appendChild(usernameLabelText)

var usernameInput = document.createElement('input')
usernameInput.style.width = '350px'
form.appendChild(usernameInput)

//PASSWORD
var passwordLabel = document.createElement('label')
form.appendChild(passwordLabel)

var passwordLabelText = document.createTextNode('Password')
passwordLabel.appendChild(passwordLabelText)

var passwordInput = document.createElement('input')
passwordInput.style.width = '350px'
form.appendChild(passwordInput)


var loginUnder = document.createElement('div')
loginUnder.style.margin = '10px'
loginUnder.style.marginRight = '60px'
loginUnder.style.display = 'flex'
loginUnder.style.flexDirection = 'row'
loginUnder.style.justifyContent = 'space-between'
login.appendChild(loginUnder)

var logiinLink = document.createElement('a')
logiinLink.innerText = 'Register'
logiinLink.href = 'index.html'
loginUnder.appendChild(logiinLink)

var loginButton = document.createElement('button')
loginButton.style.width = '80px'
loginUnder.appendChild(loginButton)

var loginButtonText = document.createTextNode('Login')
loginButton.appendChild(loginButtonText)


//home

var home = document.createElement('div')
home.style.width = '4 00px'
document.body.appendChild(home)

var homeTitle = document.createElement('h2')
home.appendChild(homeTitle)

var homeText = document.createTextNode('Home')
homeTitle.appendChild(homeText)

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

var kiwiMojis = document.createElement('div')
kiwiMojis.style.display = 'flex'
kiwiMojis.style.flexDirection = 'row'
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

var nanaMojis = document.createElement('div')
nanaMojis.style.display = 'flex'
nanaMojis.style.flexDirection = 'row'
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

var oraMojis = document.createElement('div')
oraMojis.style.display = 'flex'
oraMojis.style.flexDirection = 'row'
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
