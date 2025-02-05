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

// HOME

var home = document.createElement('div')
home.style.display = 'flex'
home.style.flexDirection = 'column'
home.style.gap = '0.5rem'
// document.body.appendChild(home)

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

var homeLogoText = document.createTextNode('Logo')
homeLogo.appendChild(homeLogoText)

// ARTICLE 1

var homeArticle1 = document.createElement('article')
homeArticle1.style.display = 'flex'
homeArticle1.style.flexDirection = 'column'
homeArticle1.style.width = '200px'
homeArticle1.style.gap = '0.3rem'
home.appendChild(homeArticle1)

var homeArticle1Username = document.createElement('h3')
homeArticle1.appendChild(homeArticle1Username)

var homeArticle1UsernameText = document.createTextNode('username1')
homeArticle1Username.appendChild(homeArticle1UsernameText)

var homeArticle1Picture = document.createElement('img')
homeArticle1Picture.src = 'https://t4.ftcdn.net/jpg/09/02/37/89/240_F_902378980_u4sL7oSE5RB3fTlgJnCyscPoH6lrF4uy.jpg'
homeArticle1Picture.width = '200'
homeArticle1.appendChild(homeArticle1Picture)

var homeArticle1Caption = document.createElement('span')
homeArticle1Caption.style.display = 'flex'
homeArticle1Caption.style.width = '200px'
homeArticle1Caption.style.justifyContent = 'space-between'
homeArticle1.appendChild(homeArticle1Caption)

var homeArticle1CaptionText = document.createTextNode('Caption')
homeArticle1Caption.appendChild(homeArticle1CaptionText)

var homeArticle1LikeButton = document.createElement('button')
homeArticle1LikeButton.innerText = '🤍'
homeArticle1Caption.appendChild(homeArticle1LikeButton)

var article1buttonStatus = false

homeArticle1LikeButton.addEventListener('click', function () {

    if (!article1buttonStatus) {
        article1buttonStatus = true
        homeArticle1LikeButton.innerText = '❤️'
    } else {
        article1buttonStatus = false
        homeArticle1LikeButton.innerText = '🤍'
    }
})

var homeArticle1Date = document.createTextNode('3 weeks ago')
homeArticle1.appendChild(homeArticle1Date)

// ARTICLE 2

var homeArticle2 = document.createElement('article')
homeArticle2.style.display = 'flex'
homeArticle2.style.flexDirection = 'column'
homeArticle2.style.gap = '0.3rem'
homeArticle2.style.width = '200px'

home.appendChild(homeArticle2)

var homeArticle2Username = document.createElement('h3')
homeArticle2Username.innerText = 'username2'
homeArticle2.appendChild(homeArticle2Username)

var homeArticle2Picture = document.createElement('img')
homeArticle2Picture.src = 'https://imgs.search.brave.com/sZjKUhOvtfY9crCnDhxXV0l62Y1j-6MOfn3qjktlfr8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzk0Lzk4LzM0/LzM2MF9GXzI5NDk4/MzQ4NF9uZEx2eDZa/bkRManJQckFGSjJy/NDNlSVVUNk5HZkxu/SS5qcGc'
homeArticle2Picture.width = '200'
homeArticle2.appendChild(homeArticle2Picture)

// SPAN CAPTION & BUTTON

var homeArticle2Caption = document.createElement('span')
homeArticle2Caption.style.display = 'flex'
homeArticle2Caption.style.justifyContent = 'space-between'
homeArticle2Caption.style.width = '200px'
// homeArticle2Caption.style.fontSize = '12px'
// homeArticle2Caption.style.gap = '0.3rem'
homeArticle2.appendChild(homeArticle2Caption)

var homeArticle2CaptionText = document.createTextNode('Caption')
homeArticle2Caption.appendChild(homeArticle2CaptionText)

var homeArticle2CaptionLikeButton = document.createElement('button')
homeArticle2CaptionLikeButton.innerText = '🤍'

homeArticle2Caption.appendChild(homeArticle2CaptionLikeButton)

// LIKE BUTTON FUNCTION

var article2buttonStatus = false

homeArticle2CaptionLikeButton.addEventListener('click', function () {

    if (!article2buttonStatus) {
        article2buttonStatus = true
        homeArticle2CaptionLikeButton.innerText = '❤️'
    } else {
        article2buttonStatus = false
        homeArticle2CaptionLikeButton.innerText = '🤍'
    }
})

var homeArticle2Date = document.createTextNode('3 weeks ago')
homeArticle2.appendChild(homeArticle2Date)

// ARTICLE 3

var homeArticle3 = document.createElement('article')
homeArticle3.style.display = 'flex'
homeArticle3.style.flexDirection = 'column'
homeArticle3.style.gap = '0.3rem'
homeArticle3.style.width = '200px'
home.appendChild(homeArticle3)

var homeArticle3Username = document.createElement('h3')
homeArticle3Username.innerText = 'username3'
homeArticle3.appendChild(homeArticle3Username)

var homeArticle3Picture = document.createElement('img')
homeArticle3Picture.src = 'https://t4.ftcdn.net/jpg/10/28/90/93/240_F_1028909330_gJNTy01sKzbYo0umWlGa1e5oiWHkJxB9.jpg'
homeArticle3Picture.width = '200'
homeArticle3.appendChild(homeArticle3Picture)

var homeArticle3Caption = document.createElement('span')
homeArticle3Caption.style.display = 'flex'
homeArticle3Caption.style.width = '200px'
homeArticle3Caption.style.justifyContent = 'space-between'
homeArticle3.appendChild(homeArticle3Caption)

var homeArticle3CaptionText = document.createTextNode('Caption')
homeArticle3Caption.appendChild(homeArticle3CaptionText)

var homeArticle3CaptionLikeButton = document.createElement('button')
homeArticle3CaptionLikeButton.innerText = '🤍'
homeArticle3Caption.appendChild(homeArticle3CaptionLikeButton)

var article3buttonStatus = false

homeArticle3CaptionLikeButton.addEventListener('click', function () {

    if (!article3buttonStatus) {
        article3buttonStatus = true
        homeArticle3CaptionLikeButton.innerText = '❤️'
    } else {
        article3buttonStatus = false
        homeArticle3CaptionLikeButton.innerText = '🤍'
    }
})

var homeArticle3Date = document.createTextNode('4 weeks ago')
homeArticle3.appendChild(homeArticle3Date)

// ARTICLE 4

var homeArticle4 = document.createElement('article')
homeArticle4.style.display = 'flex'
homeArticle4.style.flexDirection = 'column'
// homeArticle4.style.width = '200px'
homeArticle4.style.gap = '0.3rem'
home.appendChild(homeArticle4)

var homeArticle4Username = document.createElement('h3')
homeArticle4Username.innerText = 'username4'
homeArticle4.appendChild(homeArticle4Username)

// PICTURE

var homeArticle4Picture = document.createElement('img')
homeArticle4Picture.src = 'https://t3.ftcdn.net/jpg/08/69/02/92/240_F_869029213_2y0i0t5Y6nZmb62r2pMp6vGfObRkcTVR.jpg'
homeArticle4Picture.width = '200'
homeArticle4.appendChild(homeArticle4Picture)

var homeArticle4Caption = document.createElement('span')
homeArticle4Caption.style.display = 'flex'
homeArticle4Caption.style.width = '200px'
homeArticle4Caption.style.justifyContent = 'space-between'
homeArticle4.appendChild(homeArticle4Caption)

var homeArticle4CaptionText = document.createTextNode('Caption')
homeArticle4Caption.appendChild(homeArticle4CaptionText)

var homeArticle4CaptionLikeButton = document.createElement('button')
homeArticle4CaptionLikeButton.innerText = '🤍'
homeArticle4Caption.appendChild(homeArticle4CaptionLikeButton)

var article4buttonStatus = false

homeArticle4CaptionLikeButton.addEventListener('click', function () {

    if (!article4buttonStatus) {
        article4buttonStatus = true
        homeArticle4CaptionLikeButton.innerText = '❤️'
    } else {
        article4buttonStatus = false
        homeArticle4CaptionLikeButton.innerText = '🤍'
    }
})

var homeArticle4Date = document.createTextNode('4 weeks ago')
homeArticle4.appendChild(homeArticle4Date)


















// Login

// element.style.backgroundColor = 'color'
// 'article', elemento tipo post
