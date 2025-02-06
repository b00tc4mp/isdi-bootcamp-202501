console.clear()


// LANDING

//ponemos color al fondo y cambiamos la fuente
document.body.style.backgroundColor= '#FFD033'
document.body.style.fontFamily = 'nunito'

//creamos div landing

var landing = document.createElement('div')
document.body.appendChild(landing)

//creamos h1 logo

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)


var landingLogoText = document.createTextNode('Bee You')
landingLogo.appendChild(landingLogoText)

//register button

var landingRegisterButton = document.createElement('button')
landing.appendChild(landingRegisterButton)


landingRegisterButton.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.removeChild(login)
    document.body.removeChild(home)
    document.body.appendChild(register)
})


var landingRegisterButtonText = document.createTextNode('Register')
landingRegisterButton.appendChild(landingRegisterButtonText)


var spaceText = document.createTextNode(' ')
landing.appendChild(spaceText)


var landingOrText = document.createTextNode('or')
landing.appendChild(landingOrText)


var spaceText = document.createTextNode(' ')
landing.appendChild(spaceText)


//login button


var landingLoginButton = document.createElement('button')
landing.appendChild(landingLoginButton)

landingLoginButton.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.removeChild(register)
    document.body.removeChild(home)
    document.body.appendChild(login)

})

var landingButtonLoginText = document.createTextNode('Login')
landingLoginButton.appendChild(landingButtonLoginText)

// REGISTER PAGE


var register = document.createElement('div')
document.body.appendChild(register)


//logo
var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)


var registerLogoText = document.createTextNode('Bee You')
registerLogo.appendChild(registerLogoText)


//title


var registerTitle = document.createElement('h2')
register.appendChild(registerTitle)


var registerTitleText = document.createTextNode('Create account')
registerTitle.appendChild(registerTitleText)


//create form


var registerForm = document.createElement('form')
register.appendChild(registerForm)


//name


var registerFormNameLabel = document.createElement('label')
registerForm.appendChild(registerFormNameLabel)


var registerFormNameLabelText = document.createTextNode('Name')
registerFormNameLabel.appendChild(registerFormNameLabelText)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


var registerFormNameInput = document.createElement('input')
registerForm.appendChild(registerFormNameInput)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


//username


var registerFormUsernameLabel = document.createElement('label')
registerForm.appendChild(registerFormUsernameLabel)


var registerFormUsernameLabelText = document.createTextNode('Username')
registerFormUsernameLabel.appendChild(registerFormUsernameLabelText)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


var registerFormUsernameInput = document.createElement('input')
registerForm.appendChild(registerFormUsernameInput)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


//password


var registerFormPasswordLabel = document.createElement('label')
registerForm.appendChild(registerFormPasswordLabel)


var registerFormPassWordLabelText = document.createTextNode('Password')
registerForm.append(registerFormPassWordLabelText)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


var registerFormPasswordInput = document.createElement('input')
registerForm.append(registerFormPasswordInput)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


//email


var registerFormEmailLabel = document.createElement('label')
registerForm.appendChild(registerFormEmailLabel)


var registerFormEmailLabelText = document.createTextNode('Email')
registerForm.appendChild(registerFormEmailLabelText)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


var registerFormEmailInput = document.createElement('input')
registerForm.appendChild(registerFormEmailInput)


var registerFormBr = document.createElement('br')
registerForm.appendChild(registerFormBr)


//return Button


var registerReturnButton = document.createElement('button')
registerForm.appendChild(registerReturnButton)


registerReturnButton.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(landing)
})


var registerReturnButtonText = document.createTextNode('Return')
registerReturnButton.appendChild(registerReturnButtonText)


//register Button


var registerButton = document.createElement('button')
registerForm.appendChild(registerButton)

registerButton.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.removeChild(login)
    document.body.appendChild(home)
})

var registerButtonText = document.createTextNode('Register')
registerButton.appendChild(registerButtonText)


//LOGIN PAGE

var login = document.createElement('div')
document.body.appendChild(login)

//logo
var loginLogo = document.createElement('h1')
login.appendChild(loginLogo)

var loginLogoText = document.createTextNode('Bee You')
loginLogo.appendChild(loginLogoText)

//title

var loginTitle = document.createElement('h2')
login.appendChild(loginTitle)

var loginTitleText = document.createTextNode('Login')
loginTitle.appendChild(loginTitleText)

// create form

var loginForm = document.createElement('form')
login.appendChild(loginForm)

//username

var loginFormUsernameLabel = document.createElement('label')
loginForm.appendChild(loginFormUsernameLabel)

var loginFormUsernameLabelText = document.createTextNode('Username')
loginFormUsernameLabel.appendChild(loginFormUsernameLabelText)

var loginFormBr = document.createElement('br')
loginForm.appendChild(loginFormBr)

var loginFormUserNameInput = document.createElement('input')
loginForm.appendChild(loginFormUserNameInput)

var loginFormBr = document.createElement('br')
loginForm.appendChild(loginFormBr)

//password

var loginFormPasswordLabel = document.createElement('label')
loginForm.appendChild(loginFormPasswordLabel)

var loginFormPasswordLabelText = document.createTextNode('Password')
loginFormPasswordLabel.appendChild(loginFormPasswordLabelText)

var loginFormBr = document.createElement('br')
loginForm.appendChild(loginFormBr)

var loginFormPasswordInput = document.createElement('input')
loginForm.appendChild(loginFormPasswordInput)

var loginFormBr = document.createElement('br')
loginForm.appendChild(loginFormBr)


//return button

var loginReturnButton = document.createElement('button')
loginForm.appendChild(loginReturnButton)

loginReturnButton.addEventListener('click', function() {
    document.body.removeChild(login)
    document.body.appendChild(landing)
})

var loginReturnButtonText = document.createTextNode('Return')
loginReturnButton.appendChild(loginReturnButtonText)


//Login Button

var loginButton = document.createElement('button')
loginForm.appendChild(loginButton)

loginButton.addEventListener('click', function() {
    document.body.removeChild(login)
    document.body.appendChild(home)
})

var loginButtonText = document.createTextNode('Login')
loginButton.appendChild(loginButtonText)


// HOMEPAGE

var home = document.createElement('div')
document.body.appendChild(home)

//logo

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

var homeLogoText = document.createTextNode('Bee You')
homeLogo.appendChild(homeLogoText)

//HOME FIRST POST

var homeFirstPost = document.createElement('article') 
home.appendChild(homeFirstPost)

var homeFirstPostName = document.createElement('h3')
homeFirstPost.appendChild(homeFirstPostName)

var homeFirstPostNameText = document.createTextNode('name1')
homeFirstPostName.appendChild(homeFirstPostNameText)

//creamos un div con unas características para que la imagen se situe dentro de un cuadrado

var squareImg = document.createElement('div')
home.appendChild(squareImg)

squareImg.style.width = '200px'
squareImg.style.height = '200px'
squareImg.style.overflow = 'hidden'

var homeFirstPostPicture = document.createElement('img')
homeFirstPostPicture.src = 'https://imgs.search.brave.com/2EcBw2UdTyJRdsx6Gp7xfBHA0A1__0QFLtCgvSXM8HE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGlj/YS1lbi1waWNvLWRl/LW1vbnRhJUMzJUIx/YS1taXJhbmRvLWhl/cm1vc2FzLW1vbnRh/JUMzJUIxYXMtYWwt/YXRhcmRlY2VyLWNv/bi1oaWVyYmEtdmVy/ZGUtaGVybW9zby12/YWxsZS1uaWVibGEt/dmVyYW5vLXBhaXNh/amUtbXVqZXItam92/ZW4tMjEyMzQyMDQ4/LmpwZw'

homeFirstPostPicture.style.width = '50%'
homeFirstPostPicture.style.height = '75%'
homeFirstPostPicture.style.objectFit = 'cover'
homeFirstPostPicture.style.objectPosition = 'top'

squareImg.appendChild(homeFirstPostPicture)


// HOME SECOND POST

var homeSecondPost = document.createElement('article')
home.appendChild(homeSecondPost)


var homeSecondPostName = document.createElement('h3')
homeSecondPost.appendChild(homeSecondPostName)

var homeSecondPostNameText = document.createTextNode('name2')
homeSecondPostName.appendChild(homeSecondPostNameText)

//este div me encuadra la iamgen en un cuadrado

var squareImg2 = document.createElement('div')
home.appendChild(squareImg2)

squareImg2.style.width = '200px'
squareImg2.style.height = '200px'
squareImg2.style.overflow = 'hidden'

//creamos la img
var homeSecondPostPicture = document.createElement('img')
homeSecondPostPicture.src = 'https://imgs.search.brave.com/IECfcLf6yGbgIjkrA3ODeCopIIl7bBMn9KCd8-fWCn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMy8xNS8xNC9i/ZWFjaC0xODUzNDQy/XzY0MC5qcGc'

homeSecondPostPicture.style.width = '50%'
homeSecondPostPicture.style.height = '75%'
homeSecondPostPicture.style.objectFit = 'cover'
homeSecondPostPicture.style.objectPosition = 'top'

//la introducimos dentro del cuadrado
squareImg2.appendChild(homeSecondPostPicture)




