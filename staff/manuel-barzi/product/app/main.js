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

var landingRegisterAnchorText = document.createTextNode('Register')
landingRegisterAnchor.appendChild(landingRegisterAnchorText)

var landingOrText = document.createTextNode('or')
landing.appendChild(landingOrText)

var landingLoginAnchor = document.createElement('a')
landing.appendChild(landingLoginAnchor)

var landingLoginAnchorText = document.createTextNode('Login')
landingLoginAnchor.appendChild(landingLoginAnchorText)


// register

var register = document.createElement('div')
document.body.appendChild(register)

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Logo')
registerLogo.appendChild(registerLogoText)

var registerForm = document.createElement('form')
register.appendChild(registerForm)

var registerFormNameLabel = document.createElement('label')
registerForm.appendChild(registerFormNameLabel)

var registerFormNameLabelText = document.createTextNode('Name')
registerFormNameLabel.appendChild(registerFormNameLabelText)

// ...

// login

var login = document.createElement('div')
document.body.appendChild(login)

// home

var home = document.createElement('div')
document.body.appendChild(home)

// ...