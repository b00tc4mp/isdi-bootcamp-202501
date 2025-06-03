console.clear()

// landing

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

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

// Register

var register = document.createElement('div')
// document.body.appendChild(register)

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Logo')
registerLogo.appendChild(registerLogoText)

var registerForm = document.createElement('form')
registerForm.style.display = 'flex'
registerForm.style.flexDirection = 'column'
registerForm.style.gap = '0.2rem'
registerForm.style.width = '200px'
register.appendChild(registerForm)

var registerFormNameLabel = document.createElement('label')
registerForm.appendChild(registerFormNameLabel)

var registerFormNameLabelText = document.createTextNode('Name ')
registerFormNameLabel.appendChild(registerFormNameLabelText)

var registerFormNameInput = document.createElement('input')
registerForm.appendChild(registerFormNameInput)

var registerFormEmailLabel = document.createElement('label')
registerForm.appendChild(registerFormEmailLabel)

var registerFormEmailLabelText = document.createTextNode(' E-mail ')
registerFormEmailLabel.appendChild(registerFormEmailLabelText)

var registerFormEmailInput = document.createElement('input')
registerForm.appendChild(registerFormEmailInput)

var registerFormUsernameLabel = document.createElement('label')
registerForm.appendChild(registerFormUsernameLabel)

var registerFormUsernameLabelText = document.createTextNode(' Username ')
registerFormUsernameLabel.appendChild(registerFormUsernameLabelText)

var registerFormUsernameInput = document.createElement('input')
registerForm.appendChild(registerFormUsernameInput)

var registerFormPasswordLabel = document.createElement('label')
registerForm.appendChild(registerFormPasswordLabel)

var registerFormPasswordLabelText = document.createTextNode(' Password ')
registerFormPasswordLabel.appendChild(registerFormPasswordLabelText)

var registerFormPasswordInput = document.createElement('input')
registerForm.appendChild(registerFormPasswordInput)

var registerFormRegisterButton = document.createElement('button')
registerForm.appendChild(registerFormRegisterButton)

var registerFormRegisterButtonText = document.createTextNode('Register')
registerFormRegisterButton.appendChild(registerFormRegisterButtonText)

var registerLoginAnchor = document.createElement('a')
register.appendChild(registerLoginAnchor)

var registerLoginAnchorText = document.createTextNode('Login')
registerLoginAnchor.appendChild(registerLoginAnchorText)



// Login

var login = document.createElement('div')
// document.body.appendChild(login)

var loginLogo = document.createElement('h1')
login.appendChild(loginLogo)

var loginLogoText = document.createTextNode('Logo')
loginLogo.appendChild(loginLogoText)

var loginForm = document.createElement('form')
loginForm.style.display = 'flex'
loginForm.style.flexDirection = 'column'
loginForm.style.width = '200px'
loginForm.style.gap = '0.2rem'

login.appendChild(loginForm)

var loginFormUsernameLabel = document.createElement('label')
loginForm.appendChild(loginFormUsernameLabel)

var loginFormUsernameLabelText = document.createTextNode('Username ')
loginFormUsernameLabel.appendChild(loginFormUsernameLabelText)

var loginFormUsernameInput = document.createElement('input')
loginForm.appendChild(loginFormUsernameInput)

var loginFormPasswordLabel = document.createElement('label')
loginForm.appendChild(loginFormPasswordLabel)

var loginFormPasswordLabelText = document.createTextNode(' Pasword ')
loginFormPasswordLabel.appendChild(loginFormPasswordLabelText)

var loginFormPasswordInput = document.createElement('input')
loginForm.appendChild(loginFormPasswordInput)

var loginFormLoginButton = document.createElement('button')
loginForm.appendChild(loginFormLoginButton)

loginFormLoginButton.addEventListener('click', function () {
    document.body.removeChild(login)
    document.body.appendChild(home)
})

var loginFormLoginButtonText = document.createTextNode('Login')
loginFormLoginButton.appendChild(loginFormLoginButtonText)

var loginRegisterAnchor = document.createElement('a')
login.appendChild(loginRegisterAnchor)

var loginRegisterAnchorText = document.createTextNode('Register')
loginRegisterAnchor.appendChild(loginRegisterAnchorText)

// home

var home = document.createElement('div')
// document.body.appendChild(home)

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

var homeLogoText = document.createTextNode('Logo')
homeLogo.appendChild(homeLogoText)

// first post

var homeFeedArticle1 = document.createElement('article')
home.appendChild(homeFeedArticle1)

var homeFeedArticle1Username = document.createElement('h3')
homeFeedArticle1.appendChild(homeFeedArticle1Username)

var homeFeedArticle1UsernameText = document.createTextNode('username1')
homeFeedArticle1Username.appendChild(homeFeedArticle1UsernameText)

var homeFeedArticle1Picture = document.createElement('img')
homeFeedArticle1Picture.src = 'https://imgs.search.brave.com/SeKbXHuYE56CawfYuC2SgeKdzfu19i05VXhv5lNu_MQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yc3py/LmdldGltZy5haS9y/ZXNpemU_dXJsPWh0/dHBzOi8vaW1nMS5n/ZXRpbWcuYWkvZ2Vu/ZXJhdGVkLzNiY2Zi/NWRmLTA0MDAtNDBj/Mi1iMzFkLTNlOGIw/OGUyOWFkZS9pbWct/MWNwb3BqNzA3TFhi/QlVZaFcxNTQ5Lmpw/ZWcmdHlwZT13ZWJw/JndpZHRoPTIwNDgm/c3BlZWQ9NQ'
homeFeedArticle1Picture.width = '200'
homeFeedArticle1.appendChild(homeFeedArticle1Picture)

var homeFeedArticle1Caption = document.createTextNode('Caption')
homeFeedArticle1.appendChild(homeFeedArticle1Caption)

var homeFeedArticle1Date = document.createTextNode('3 weeks ago')
homeFeedArticle1.appendChild(homeFeedArticle1Date)

// second post

var homeFeedArticle2 = document.createElement('article')
home.appendChild(homeFeedArticle2)

var homeFeedArticle2Username = document.createElement('h3')
homeFeedArticle2Username.innerText = 'username2'
homeFeedArticle2.appendChild(homeFeedArticle2Username)

var homeFeedArticle2Picture = document.createElement('img')
homeFeedArticle2Picture.src = 'https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc'
homeFeedArticle2Picture.width = '200'
homeFeedArticle2.appendChild(homeFeedArticle2Picture)

var homeFeedArticle2Caption = document.createTextNode('Caption')
homeFeedArticle2.appendChild(homeFeedArticle2Caption)

var homeFeedArticle2Date = document.createTextNode('3 weeks ago')
homeFeedArticle2.appendChild(homeFeedArticle2Date)



















// Login

// element.style.backgroundColor = 'color'
// 'article', elemento tipo post
