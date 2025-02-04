console.clear()
console.log('Hello,App!')

//////// Landing
// landing logo

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landingLogo.innerText = 'Logo'
landing.appendChild(landingLogo)

// landing register or login

var landingRegisterOrLogin = document.createElement('div')
landing.appendChild(landingRegisterOrLogin)

var registerAnchor = document.createElement('a')
registerAnchor.href = 'index.html'
registerAnchor.innerText = 'Register'
landingRegisterOrLogin.appendChild(registerAnchor)

var orText = document.createTextNode(' or ')
landingRegisterOrLogin.appendChild(orText)

var loginAnchor = document.createElement('a')
loginAnchor.href = 'index.html'
loginAnchor.innerText = 'Login'
landingRegisterOrLogin.appendChild(loginAnchor)


//////// Register

var register = document.createElement('div') //register div general
document.body.appendChild(register)

var registerLogo = document.createElement('h1') // logo de register
registerLogo.innerText = 'Logo'
landing.appendChild(registerLogo)

var registerInputForm = document.createElement('form') // div form de los inputs de register
registerInputForm.style.display = 'flex'
registerInputForm.style.flexDirection = 'column'
register.appendChild(registerInputForm)

// name input
var registerNameLabel = document.createElement('label')
registerNameLabel.htmlFor = 'register-name'
registerNameLabel.innerText = 'Name'
registerInputForm.appendChild(registerNameLabel)

var registerNameInput = document.createElement('input')
registerNameInput.id = 'register-name'
registerNameInput.style.width = '300px'
registerInputForm.appendChild(registerNameInput)

// e-mail input
var registerEmailText = document.createElement('label')
registerEmailText.htmlFor = 'register-email'
registerEmailText.innerText = 'E-mail'
registerInputForm.appendChild(registerEmailText)

var registerEmailInput = document.createElement('input')
registerEmailInput.id = 'register-email'
registerEmailInput.style.width = '300px'
registerInputForm.appendChild(registerEmailInput)

// username input
var registerUsernameText = document.createElement('label')
registerUsernameText.htmlFor = 'register-username'
registerUsernameText.innerText = 'Username'
registerInputForm.appendChild(registerUsernameText)

var registerUsernameInput = document.createElement('input')
registerUsernameInput.id = 'register-username'
registerUsernameInput.style.width = '300px'
registerInputForm.appendChild(registerUsernameInput)

// password input
var registerPasswordText = document.createElement('label')
registerPasswordText.htmlFor = 'register-password'
registerPasswordText.innerText = 'Password'
registerInputForm.appendChild(registerPasswordText)

var registerPasswordInput = document.createElement('input')
registerPasswordInput.id = 'register-password'
registerPasswordInput.style.width = '300px'
registerInputForm.appendChild(registerPasswordInput)

// div del login y del register

var registerLoginAndRegister = document.createElement('div') // div login register
registerLoginAndRegister.style.width = '310px'
registerLoginAndRegister.style.marginTop = '15px'
registerLoginAndRegister.style.display = 'flex'
registerLoginAndRegister.style.justifyContent = 'space-between'
register.appendChild(registerLoginAndRegister)

var registerLoginAnchor = document.createElement('a') // anchor login
registerLoginAnchor.href = 'index.html'
registerLoginAnchor.innerText = 'Login'
registerLoginAndRegister.appendChild(registerLoginAnchor)

var registerRegisterButton = document.createElement('button') // boton register
registerRegisterButton.href = 'index.html'
registerRegisterButton.innerText = 'Register'
registerLoginAndRegister.appendChild(registerRegisterButton)

//////// Login

var login = document.createElement('div') //login div general
document.body.appendChild(login)

var loginLogo = document.createElement('h1') // logo de login
loginLogo.innerText = 'Logo'
login.appendChild(loginLogo)

var loginInputForm = document.createElement('form') // div form de los inputs de login
loginInputForm.style.display = 'flex'
loginInputForm.style.flexDirection = 'column'
login.appendChild(loginInputForm)

/// username input
var loginUsernameText = document.createElement('label')
loginUsernameText.htmlFor = 'login-username'
loginUsernameText.innerText = 'Username'
loginInputForm.appendChild(loginUsernameText)

var loginUsernameInput = document.createElement('input')
loginUsernameInput.id = 'login-username'
loginUsernameInput.style.width = '300px'
loginInputForm.appendChild(loginUsernameInput)

// password input
var loginPasswordText = document.createElement('label')
loginPasswordText.htmlFor = 'login-password'
loginPasswordText.innerText = 'Password'
loginInputForm.appendChild(loginPasswordText)

var loginPasswordInput = document.createElement('input')
loginPasswordInput.id = 'login-password'
loginPasswordInput.style.width = '300px'
loginInputForm.appendChild(loginPasswordInput)

// div del register y del login

var loginRegisterAndLogin = document.createElement('div') // div register login
loginRegisterAndLogin.style.width = '310px'
loginRegisterAndLogin.style.marginTop = '15px'
loginRegisterAndLogin.style.display = 'flex'
loginRegisterAndLogin.style.justifyContent = 'space-between'
login.appendChild(loginRegisterAndLogin)

var loginRegisterAnchor = document.createElement('a') // anchor register
loginRegisterAnchor.href = 'index.html'
loginRegisterAnchor.innerText = 'Register'
loginRegisterAndLogin.appendChild(loginRegisterAnchor)

var loginLoginButton = document.createElement('button') // boton login
loginLoginButton.href = 'index.html'
loginLoginButton.innerText = 'Login'
loginRegisterAndLogin.appendChild(loginLoginButton)

//////// Home

var home = document.createElement('div') //home div general
document.body.appendChild(home)

var homeLogo = document.createElement('h1') // logo de login
homeLogo.innerText = 'Logo'
home.appendChild(homeLogo)

var imageDiv = document.createElement('div')
imageDiv.style.display = 'flex'
imageDiv.style.flexDirection = 'column'
home.appendChild(imageDiv)

var img1 = document.createElement('img')
img1.src = '1.jpg'
imageDiv.appendChild(img1)
img1.style.width = '300px'

var img2 = document.createElement('img')
img2.src = '2.jpg'
imageDiv.appendChild(img2)
img2.style.width = '300px'

var img3 = document.createElement('img')
img3.src = '3.jpg'
imageDiv.appendChild(img3)
img3.style.width = '300px'

var img4 = document.createElement('img')
img4.src = '4.jpg'
imageDiv.appendChild(img4)
img4.style.width = '300px'




