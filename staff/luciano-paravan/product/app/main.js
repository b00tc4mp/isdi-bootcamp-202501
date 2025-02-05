
// Landing

document.body.style.color = '#428A82'
document.body.style.backgroundColor = '#E0EEEC'
document.body.style.fontFamily = 'verdana'
var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

var landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)

var welcome = document.createElement('h3')
landing.appendChild(welcome)

var welcomeText = document.createTextNode('Welcome!')
welcome.appendChild(welcomeText)

var loginRegisterBox = document.createElement('div')
loginRegisterBox.style.display = 'flex'
loginRegisterBox.style.flexDirection = 'column'
loginRegisterBox.style.gap = '5px'
landing.appendChild(loginRegisterBox)

var loginBox = document.createElement('button')
loginBox.textContent = 'Login'
loginBox.style.color = '#FFFFFF'
loginBox.style.backgroundColor = '#428A82'
loginRegisterBox.appendChild(loginBox)

loginBox.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(login)
})

var registerBox = document.createElement('button')
registerBox.textContent = 'Register'
registerBox.style.backgroundColor = '#E0EEEC'
registerBox.style.borderColor = '#428A82'
loginRegisterBox.appendChild(registerBox)

registerBox.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(register)    
})

// Register

var register = document.createElement('div')
//document.body.appendChild(register)

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Logo')
registerLogo.appendChild(registerLogoText)

var registerForm = document.createElement('form')
registerForm.style.display = 'flex'
registerForm.style.flexDirection = 'column'
registerForm.style.gap = '0.5rem'
//registerForm.style.alignItems = 'center'
register.appendChild(registerForm)

var nameLabel = document.createElement('label')
nameLabel.textContent = 'Name: '
registerForm.appendChild(nameLabel)

var nameInput = document.createElement('input')
nameInput.type = 'text'
nameInput.name = 'name'
registerForm.appendChild(nameInput)

var surnameLabel = document.createElement('label')
surnameLabel.textContent = 'Surname: '
registerForm.appendChild(surnameLabel)

var surnameInput = document.createElement('input')
surnameInput.type = 'text'
surnameInput.name = 'surname'
registerForm.appendChild(surnameInput)

var emailLabel = document.createElement('label')
emailLabel.textContent = 'E-mail: '
registerForm.appendChild(emailLabel)

var emailInput = document.createElement('input')
emailInput.type = 'text'
emailInput.name = 'email'
registerForm.appendChild(emailInput)

var usernameLabel = document.createElement('label')
usernameLabel.textContent = 'Username: '
registerForm.appendChild(usernameLabel)

var usernameInput = document.createElement('input')
usernameInput.type = 'text'
usernameInput.name = 'username'
registerForm.appendChild(usernameInput)

var passwordLabel = document.createElement('label')
passwordLabel.textContent = 'Password: '
registerForm.appendChild(passwordLabel)

var passwordInput = document.createElement('input')
passwordInput.type = 'password'
passwordInput.name = 'password'
registerForm.appendChild(passwordInput)

var registerSubmit = document.createElement('button')
registerSubmit.textContent = 'Register'
registerSubmit.type = 'submit'
registerSubmit.style.backgroundColor = '#428A82'
registerSubmit.style.color = '#FFFFFF'
registerForm.appendChild(registerSubmit)

var loginRegister = document.createElement('a')
loginRegister.textContent = 'Login'
loginRegister.style.fontWeight = 'bold'
loginRegister.style.textDecoration = 'underline'
loginRegister.style.marginTop = '50px'
loginRegister.style.textAlign = 'center'
registerForm.appendChild(loginRegister)

loginRegister.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(login)
})

// Login

var login = document.createElement('div')
//document.body.appendChild(login)

var loginLogo = document.createElement('h1')
loginLogo.textContent = 'Logo'
login.appendChild(loginLogo)

var loginText = document.createElement('h3')
loginText.textContent = 'Login'
login.appendChild(loginText)

var loginForm = document.createElement('form')
loginForm.style.display = 'flex'
loginForm.style.flexDirection = 'column'
loginForm.style.gap = '0.5rem'
login.appendChild(loginForm)

var loginNameLabel = document.createElement('label')
loginNameLabel.textContent = 'Name: '
loginForm.appendChild(loginNameLabel)

var loginNameInput = document.createElement('input')
loginNameInput.type = 'text'
loginNameInput.name = 'login-name'
loginForm.appendChild(loginNameInput)

var loginPasswordLabel = document.createElement('label')
loginPasswordLabel.textContent = 'Password: '
loginForm.appendChild(loginPasswordLabel)

var loginPasswordInput = document.createElement('input')
loginPasswordInput.type = 'password'
loginPasswordInput.name = 'password-input'
loginForm.appendChild(loginPasswordInput)

var loginSubmit = document.createElement('button')
loginSubmit.textContent = 'Login'
loginSubmit.type = 'submit'
loginSubmit.style.backgroundColor = '#428A82'
loginSubmit.style.color = '#FFFFFF'
loginForm.appendChild(loginSubmit)

var registerLogin = document.createElement('a')
registerLogin.textContent = 'Register'
registerLogin.style.fontWeight = 'bold'
registerLogin.style.textDecoration = 'underline'
registerLogin.style.marginTop = '50px'
registerLogin.style.textAlign = 'center'
loginForm.appendChild(registerLogin)

registerLogin.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(register)
})

// HOME

var home = document.createElement('div')
//document.body.appendChild(home)

var logoHome = document.createElement('h1')
logoHome.textContent = 'Logo'
home.appendChild(logoHome)

var logOutHome = document.createElement('button')
logOutHome.textContent = 'Log out'
logOutHome.style.color = '#FFFFFF'
logOutHome.style.backgroundColor = '#428A82'
home.appendChild(logOutHome)

var postFrame1 = document.createElement('article')
home.appendChild(postFrame1)

var usernamePostFrame1 = document.createElement('p')
usernamePostFrame1.textContent = 'username1'
postFrame1.appendChild(usernamePostFrame1)

var photoContainer1 = document.createElement('div')
photoContainer1.style.width = '100%' //'440px'
photoContainer1.style.height = '440px'
postFrame1.appendChild(photoContainer1)

var photoImg1 = document.createElement('img')
photoImg1.src = 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
photoImg1.style.objectFit = 'cover'
photoImg1.style.width = '100%'
photoImg1.style.height = '100%'
photoContainer1.appendChild(photoImg1)

var commentPostFrame1 = document.createElement('p')
commentPostFrame1.textContent = 'comment 1'
postFrame1.appendChild(commentPostFrame1)

var postFrame2 = document.createElement('article')
home.appendChild(postFrame2)

var usernamePostFrame2 = document.createElement('p')
usernamePostFrame2.textContent = 'username2'
postFrame2.appendChild(usernamePostFrame2)

var photoContainer2 = document.createElement('div')
photoContainer2.style.width = '100%'
photoContainer2.style.height = '440px'
postFrame2.appendChild(photoContainer2)

var photoImg2 = document.createElement('img')
photoImg2.src = 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg'
photoImg2.style.objectFit = 'cover'
photoImg2.style.width = '100%'
photoImg2.style.height = '100%'
photoContainer2.appendChild(photoImg2)

var commentPostFrame2 = document.createElement('p')
commentPostFrame2.textContent = 'comment 2'
postFrame2.appendChild(commentPostFrame2)


registerForm.addEventListener('submit', function () {
    document.body.removeChild(register)
    document.body.appendChild(login)
})

loginForm.addEventListener('submit', function() {
    document.body.removeChild(login)
    document.body.appendChild(home)
})

logOutHome.addEventListener('click', function () {
    document.body.removeChild(home)
    document.body.appendChild(landing)
})











