console.clear()
console.log('Hello, App!')

// landing

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

//var landingLogoText = new Text('Logo')
var landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)

var landingRegisterAnchor = document.createElement('a')
landing.appendChild(landingRegisterAnchor)

landingRegisterAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(register)
})

var landingRegisterAnchorText = document.createTextNode('Register')
landingRegisterAnchor.appendChild(landingRegisterAnchorText)

var landingOrText = document.createTextNode('or')
landing.appendChild(landingOrText)

var landingLoginAnchor = document.createElement('a')
landing.appendChild(landingLoginAnchor)

landingLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(login)
})

var landingLoginAnchorText = document.createTextNode('Login')
landingLoginAnchor.appendChild(landingLoginAnchorText)


/* register */

var register = document.createElement('div')
// document.body.appendChild(register)

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Logo')
registerLogo.appendChild(registerLogoText)

// form

var registerForm = document.createElement('form')
register.appendChild(registerForm)

var registerFormNameLabel = document.createElement('label')
registerForm.appendChild(registerFormNameLabel)

// name

var registerFormNameLabelText = document.createTextNode('Name')
registerFormNameLabel.appendChild(registerFormNameLabelText)

var registerFormNameInput = document.createElement('input')
registerForm.appendChild(registerFormNameInput)

// email

var registerFormEmailLabel = document.createElement('label')
registerForm.appendChild(registerFormEmailLabel)

var registerFormEmailLabelText = document.createTextNode('E-mail')
registerFormEmailLabel.appendChild(registerFormEmailLabelText)

var registerFormEmailInput = document.createElement('input')
registerForm.appendChild(registerFormEmailInput)

// username

var registerFormUsernameLabel = document.createElement('label')
registerForm.appendChild(registerFormUsernameLabel)

var registerFormUsernameLabelText = document.createTextNode('Username')
registerFormUsernameLabel.appendChild(registerFormUsernameLabelText)

var registerFormUsernameInput = document.createElement('input')
registerForm.appendChild(registerFormUsernameInput)

// password

var registerFormPasswordLabel = document.createElement('label')
registerForm.appendChild(registerFormPasswordLabel)

var registerFormPasswordLabelText = document.createTextNode('Password')
registerFormPasswordLabel.appendChild(registerFormPasswordLabelText)

var registerFormPasswordInput = document.createElement('input')
registerForm.appendChild(registerFormPasswordInput)

// submit

var registerFormSubmitButton = document.createElement('button')
registerForm.appendChild(registerFormSubmitButton)

var registerFormSubmitButtonText = document.createTextNode('Register')
registerFormSubmitButton.appendChild(registerFormSubmitButtonText)

// anchor

var registerLoginAnchor = document.createElement('a')
register.appendChild(registerLoginAnchor)

var registerLoginAnchorText = document.createTextNode('Login')
registerLoginAnchor.appendChild(registerLoginAnchorText)

// ...

/* login */

var login = document.createElement('div')
// document.body.appendChild(login)

var loginLogo = document.createElement('h1')
login.appendChild(loginLogo)

var loginLogoText = document.createTextNode('Logo')
loginLogo.appendChild(loginLogoText)

// form

var loginForm = document.createElement('form')
login.appendChild(loginForm)

// username

var loginFormUsernameLabel = document.createElement('label')
loginForm.appendChild(loginFormUsernameLabel)

var loginFormUsernameLabelText = document.createTextNode('Username')
loginFormUsernameLabel.appendChild(loginFormUsernameLabelText)

var loginFormUsernameInput = document.createElement('input')
loginForm.appendChild(loginFormUsernameInput)

// password

var loginFormPasswordLabel = document.createElement('label')
loginForm.appendChild(loginFormPasswordLabel)

var loginFormPasswordLabelText = document.createTextNode('Password')
loginFormPasswordLabel.appendChild(loginFormPasswordLabelText)

var loginFormPasswordInput = document.createElement('input')
loginForm.appendChild(loginFormPasswordInput)

// submit

var loginFormSubmitButton = document.createElement('button')
loginForm.appendChild(loginFormSubmitButton)

var loginFormSubmitButtonText = document.createTextNode('Login')
loginFormSubmitButton.appendChild(loginFormSubmitButtonText)

// anchor

var loginRegisterAnchor = document.createElement('a')
login.appendChild(loginRegisterAnchor)

var loginRegisterAnchorText = document.createTextNode('Register')
loginRegisterAnchor.appendChild(loginRegisterAnchorText)

/* home */

var home = document.createElement('div')
// document.body.appendChild(home)

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

//var homeLogoText = new Text('Logo')
var homeLogoText = document.createTextNode('Logo')
homeLogo.appendChild(homeLogoText)

// ...