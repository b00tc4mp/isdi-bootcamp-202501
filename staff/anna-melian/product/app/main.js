console.clear()
console.log('Hello, App!')

// landing

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

var landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)


var landingRegisterAnchor = document.createElement('a')
landing.appendChild(landingRegisterAnchor)

// click en register, aparece pantalla de register
landingRegisterAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(register)
})

var landingRegisterAnchorText = document.createTextNode('Register')
landingRegisterAnchor.appendChild(landingRegisterAnchorText)

var landingOrText = document.createTextNode(' or ')
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
//document.body.appendChild(register)

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Logo')
registerLogo.appendChild(registerLogoText)

var registerInstructions = document.createElement('p')
register.appendChild(registerInstructions)

var registerInstructionsText = document.createTextNode('To register, enter the following information. ')
registerInstructions.appendChild(registerInstructionsText)

// from

var registerForm = document.createElement('form')
register.appendChild(registerForm)

var registerFormNameLabel = document.createElement('label')
registerForm.appendChild(registerFormNameLabel)

//name

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


registerFormSubmitButton.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(login)
})


// anchor 

var registerLoginAnchor = document.createElement('a')
register.appendChild(registerLoginAnchor)

var registerLoginAnchorText = document.createTextNode('Login')
registerLoginAnchor.appendChild(registerLoginAnchorText)

registerLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(register)
    document.body.appendChild(login)
})


/* login */

var login = document.createElement('div')
//document.body.appendChild(login)

var loginLogo = document.createElement('h1')
login.appendChild(loginLogo)

var loginLogoText = document.createTextNode('Logo')
loginLogo.appendChild(loginLogoText)

var loginInstructions = document.createElement('p')
login.appendChild(loginInstructions)

var loginInstructionsText = document.createTextNode('To login enter your credentials.')
loginInstructions.appendChild(loginInstructionsText)


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

loginFormSubmitButton.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(home)
})



// anchor

var loginRegisterAnchor = document.createElement('a')
login.appendChild(loginRegisterAnchor)

var loginRegisterAnchorText = document.createTextNode('Register')
loginRegisterAnchor.appendChild(loginRegisterAnchorText)

loginRegisterAnchor.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(register)
})


/* home */

var home = document.createElement('div')
//document.body.appendChild(home)

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

var homeLogoText = document.createTextNode('Logo')
homeLogo.appendChild(homeLogoText)

var homeTop = document.createElement('span')
homeTop.style.display = 'flex'
homeTop.style.justifyContent = 'space-between'
home.appendChild(homeTop)

var homeGreeting = document.createTextNode('Hello, User!')
homeTop.appendChild(homeGreeting)

var homeExitButton = document.createElement('button')
homeTop.appendChild(homeExitButton)

var homeExitButtonText = document.createTextNode('Exit')
homeExitButton.appendChild(homeExitButtonText)

homeExitButton.addEventListener('click', function () {
    document.body.removeChild(home)
    document.body.appendChild(landing)
})

var homeSpace = document.createElement('div')
homeSpace.style.height = '50px'
home.appendChild(homeSpace)


var homePost1 = document.createElement('div')
home.appendChild(homePost1)

var homePost1UserName = document.createElement('p')
homePost1.appendChild(homePost1UserName)

var homePost1UserNameText = document.createTextNode('username1')
homePost1UserName.appendChild(homePost1UserNameText)

var homePost1Photo = document.createElement('img')
homePost1Photo.src = 'https://imgs.search.brave.com/gLe1nNepyk97sd_4fBikHFr8rWHTdPIChvqye9jikaU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc1/MjU4NDEyL2VzL2Zv/dG8vYm9zcXVlLWRl/LXNlY3VveWFzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/NXZqRjRkSWhnVkdo/aXFUMFhmV2Z0MUVa/SFU1X1hwZnJndTky/QUk5SWFjPQ'
homePost1Photo.style.width = '500px'
homePost1Photo.style.display = 'block'
homePost1.appendChild(homePost1Photo)

var homePost1PhotoCaption = document.createElement('span')
homePost1PhotoCaption.style.display = 'flex'
homePost1PhotoCaption.style.justifyContent = 'space-between'
homePost1PhotoCaption.style.width = '500px'
homePost1.appendChild(homePost1PhotoCaption)

var homePost1PhotoCaptionText = document.createTextNode('Caption')
homePost1PhotoCaption.appendChild(homePost1PhotoCaptionText)

var homePost1PhotoCaptionLikeButton = document.createElement('button')
homePost1PhotoCaption.appendChild(homePost1PhotoCaptionLikeButton)

var homePost1PhotoCaptionLikeButtonWhite = document.createTextNode('🤍')
homePost1PhotoCaptionLikeButton.appendChild(homePost1PhotoCaptionLikeButtonWhite)

var homePost1PhotoCaptionLikeButtonRed = document.createTextNode('❤️')

var post1Like = false
homePost1PhotoCaptionLikeButton.addEventListener('click', function () {
    if (!post1Like) {
        homePost1PhotoCaptionLikeButton.removeChild(homePost1PhotoCaptionLikeButtonWhite)
        homePost1PhotoCaptionLikeButton.appendChild(homePost1PhotoCaptionLikeButtonRed)
        post1Like = true
    }
    else {
        homePost1PhotoCaptionLikeButton.removeChild(homePost1PhotoCaptionLikeButtonRed)
        homePost1PhotoCaptionLikeButton.appendChild(homePost1PhotoCaptionLikeButtonWhite)
        post1Like = false
    }
})