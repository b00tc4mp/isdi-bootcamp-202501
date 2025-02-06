console.clear()
console.log('Hello, App!')

// ****  LANDING

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

var landingLogoText = document.createTextNode('Landing')
landingLogo.appendChild(landingLogoText)


// Login
var landingLoginAnchor = document.createElement('a')
landingLoginAnchor.style.textDecoration = 'underline'
landingLoginAnchor.style.fontWeight = 'bold'
landingLoginAnchor.style.color = 'white'
landing.appendChild(landingLoginAnchor)

landingLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(login)
})

var landingLoginAnchorText = document.createTextNode('Login')
landingLoginAnchor.appendChild(landingLoginAnchorText)

// Or
var landingOrText = document.createTextNode(' or ')
landing.appendChild(landingOrText)

// Register
var landingRegisterAnchor = document.createElement('a')
landingRegisterAnchor.style.textDecoration = 'underline'
landingRegisterAnchor.style.fontWeight = 'bold'
landingRegisterAnchor.style.color = 'white'
landing.appendChild(landingRegisterAnchor)

landingRegisterAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(register)
})

var landingRegisterAnchorText = document.createTextNode('Register')
landingRegisterAnchor.appendChild(landingRegisterAnchorText)

//  --------


// ****  REGISTER
var register = document.createElement('div')
//document.body.appendChild(register)

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Register')
registerLogo.appendChild(registerLogoText)

// Form
var registerForm = document.createElement('form')
register.appendChild(registerForm)

var registerFormNameLabel = document.createElement('label')
registerForm.appendChild(registerFormNameLabel)

// Name 
var registerFormNameLabelText = document.createTextNode('Name')
registerFormNameLabel.appendChild(registerFormNameLabelText)

registerForm.appendChild(document.createElement('br'))
// Formulario 
var registerFormNameInput = document.createElement('input')
registerForm.appendChild(registerFormNameInput)
// Espacio
registerForm.appendChild(document.createElement('br'))


// Email 
var registerFormEmailLabel = document.createElement('label')
registerForm.appendChild(registerFormEmailLabel)

var registerFormEmailLabelText = document.createTextNode('E-mail')
registerFormEmailLabel.appendChild(registerFormEmailLabelText)

registerForm.appendChild(document.createElement('br'))

var registerFormEmailInput = document.createElement('input')
registerForm.appendChild(registerFormEmailInput)

registerForm.appendChild(document.createElement('br'))


// Username 
var registerFormUsernameLabel = document.createElement('label')
registerForm.appendChild(registerFormUsernameLabel)

var registerFormUsernameLabelText = document.createTextNode('Username')
registerFormUsernameLabel.appendChild(registerFormUsernameLabelText)

registerForm.appendChild(document.createElement('br'))

var registerFormUsernameInput = document.createElement('input')
registerForm.appendChild(registerFormUsernameInput)

registerForm.appendChild(document.createElement('br'))


// Password
var registerFormPasswordLabel = document.createElement('label')
registerForm.appendChild(registerFormPasswordLabel)

var registerFormPasswordLabelText = document.createTextNode('Password')
registerFormPasswordLabel.appendChild(registerFormPasswordLabelText)

registerForm.appendChild(document.createElement('br'))

var registerFormPasswordInput = document.createElement('input')
registerForm.appendChild(registerFormPasswordInput)

registerForm.appendChild(document.createElement('br'))
registerForm.appendChild(document.createElement('br'))

// Login
var registerFormLoginAnchor = document.createElement('a')
registerFormLoginAnchor.style.textDecoration = 'underline'
registerFormLoginAnchor.style.fontWeight = 'bold'
registerFormLoginAnchor.style.color = 'white'
registerForm.appendChild(registerFormLoginAnchor)

var registerFormLoginAnchorText = document.createTextNode('Login')
registerFormLoginAnchor.appendChild(registerFormLoginAnchorText)

registerFormLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(login)
})

// Button - Register
var registerFormSubmitButton = document.createElement('button')
registerForm.appendChild(registerFormSubmitButton)

var registerFormSubmitButtonText = document.createTextNode('Register')
registerFormSubmitButton.appendChild(registerFormSubmitButtonText)

// ------------
registerFormSubmitButton.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(home)
})

// ****  LOGIN

var login = document.createElement('div')
//document.body.appendChild(login)

var landingLoginLogo = document.createElement('h1')
login.appendChild(landingLoginLogo)

var landingLoginText = document.createTextNode('Login')
landingLoginLogo.appendChild(landingLoginText)

// Form
var loginForm = document.createElement('form')
login.appendChild(loginForm)

// Username 
var loginFormUsernameLabel = document.createElement('label')
loginForm.appendChild(loginFormUsernameLabel)

var loginFormUsernameLabelText = document.createTextNode('Username')
loginFormUsernameLabel.appendChild(loginFormUsernameLabelText)

loginForm.appendChild(document.createElement('br'))

var loginFormUsernameInput = document.createElement('input')
loginForm.appendChild(loginFormUsernameInput)

loginForm.appendChild(document.createElement('br'))


// Password
var loginFormPasswordLabel = document.createElement('label')
loginForm.appendChild(loginFormPasswordLabel)

var loginFormPasswordLabelText = document.createTextNode('Password')
loginFormPasswordLabel.appendChild(loginFormPasswordLabelText)

loginForm.appendChild(document.createElement('br'))

var loginFormPasswordInput = document.createElement('input')
loginForm.appendChild(loginFormPasswordInput)

loginForm.appendChild(document.createElement('br'))
loginForm.appendChild(document.createElement('br'))

// Button - Register
var loginFormSubmitButton = document.createElement('button')
loginForm.appendChild(loginFormSubmitButton)

loginFormSubmitButton.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(register)
})

var loginFormSubmitButtonTesxt = document.createTextNode('Register')
loginFormSubmitButton.appendChild(loginFormSubmitButtonTesxt)

// Login
var loginFormLoginAnchor = document.createElement('a')
loginFormLoginAnchor.style.textDecoration = 'underline'
loginFormLoginAnchor.style.fontWeight = 'bold'
loginFormLoginAnchor.style.color = 'white'
loginForm.appendChild(loginFormLoginAnchor)

loginFormLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(home)
})

var loginFormLoginAnchorText = document.createTextNode('Login')
loginFormLoginAnchor.appendChild(loginFormLoginAnchorText)


// ****  HOME 

var home = document.createElement('div')
// document.body.appendChild(home)

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

var homeLogoText = document.createTextNode('Home')
homeLogo.appendChild(homeLogoText)

// Form

var news = document.createElement('article')
news.style.display = 'flex'
news.style.width = '100%'
news.style.flexDirection = 'column'
news.style.gap = '30px'
home.appendChild(news)


// Imagenes
var news1 = document.createElement('img')
news1.src = 'https://i.pinimg.com/236x/ff/a1/22/ffa122f36bffb392661c0de948475635.jpg'
news1.style.width = '90%'
news1.style.height = 'auto'
news1.style.margin = 'auto'
news1.style.borderRadius = '10%'
news1.style.border = '5px solid'
news.appendChild(news1)

var news2 = document.createElement('img')
news2.src = 'https://i.pinimg.com/564x/bd/68/af/bd68af256a4c6fd0ada2f60183e88f39.jpg'
news2.style.width = '90%'
news2.style.height = 'auto'
news2.style.margin = 'auto'
news2.style.borderRadius = '10%'
news2.style.border = '5px solid'
news.appendChild(news2)

var news3 = document.createElement('img')
news3.src = 'https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D179581354W8333H10000/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/programador-informatico-codificadores-software-burger-lovers.jpg'
news3.style.width = '90%'
news3.style.height = 'auto'
news3.style.margin = 'auto'
news3.style.borderRadius = '10%'
news3.style.border = '5px solid'
news.appendChild(news3)



// // ... 