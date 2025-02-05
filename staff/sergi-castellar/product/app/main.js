console.clear()
console.log('Hello,App!')
// elemento article para los posts. img parrafo... montar un post de ig en html

//////// Landing
// landing logo

var landing = document.createElement('div')
//document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landingLogo.innerText = 'Logo'
landing.appendChild(landingLogo)

// landing register or login

var landingRegisterOrLogin = document.createElement('div')
landing.appendChild(landingRegisterOrLogin)

var registerAnchor = document.createElement('a')
//registerAnchor.href = 'index.html'
registerAnchor.innerText = 'Register'
landingRegisterOrLogin.appendChild(registerAnchor)

registerAnchor.addEventListener('click',
    function() {
        document.body.removeChild(landing)
        document.body.appendChild(register)
    }
)

var orText = document.createTextNode(' or ')
landingRegisterOrLogin.appendChild(orText)

var loginAnchor = document.createElement('a')
//loginAnchor.href = 'index.html'
loginAnchor.innerText = 'Login'
landingRegisterOrLogin.appendChild(loginAnchor)

loginAnchor.addEventListener('click',
    function() {
        document.body.removeChild(landing)
        document.body.appendChild(login)
    }
)


//////// Register

var register = document.createElement('div') //register div general
//document.body.appendChild(register)

var registerLogo = document.createElement('h1') // logo de register
registerLogo.innerText = 'Logo'
register.appendChild(registerLogo)

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
//registerLoginAnchor.href = 'index.html'
registerLoginAnchor.innerText = 'Login'
registerLoginAndRegister.appendChild(registerLoginAnchor)

registerLoginAnchor.addEventListener('click',
    function() {
        document.body.removeChild(register)
        document.body.appendChild(login)
    }
)

var registerRegisterButton = document.createElement('button') // boton register
//registerRegisterButton.href = 'index.html'
registerRegisterButton.innerText = 'Register'
registerLoginAndRegister.appendChild(registerRegisterButton)


registerRegisterButton.addEventListener('click',
    function() {
        document.body.removeChild(register)
        document.body.appendChild(home)
    }
)

//////// Login

var login = document.createElement('div') //login div general
//document.body.appendChild(login)

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
//loginRegisterAnchor.href = 'index.html'
loginRegisterAnchor.innerText = 'Register'
loginRegisterAndLogin.appendChild(loginRegisterAnchor)

loginRegisterAnchor.addEventListener('click',
    function() {
        document.body.removeChild(login)
        document.body.appendChild(register)
    }
)

var loginLoginButton = document.createElement('button') // boton login
//loginLoginButton.href = 'index.html'
loginLoginButton.innerText = 'Login'
loginRegisterAndLogin.appendChild(loginLoginButton)

loginLoginButton.addEventListener('click',
    function() {
        document.body.removeChild(login)
        document.body.appendChild(home)
    }
)

//////// Home

var home = document.createElement('div') //home div general
document.body.appendChild(home)

var homeLogo = document.createElement('h1') // logo de login
homeLogo.innerText = 'Logo'
home.appendChild(homeLogo)

var postArticleDiv = document.createElement('article')
postArticleDiv.style.display = 'flex'
postArticleDiv.style.flexDirection = 'column'
home.appendChild(postArticleDiv)

// post 1

var firstPostDiv = document.createElement('article')
postArticleDiv.appendChild(firstPostDiv)

var firstPostHeader = document.createElement('header')
firstPostDiv.appendChild(firstPostHeader)

var firstPostTitle = document.createElement('h2')
firstPostTitle.innerText = 'Post 1 Title'
firstPostHeader.appendChild(firstPostTitle)

var firstPostFigure = document.createElement('figure')
firstPostDiv.appendChild(firstPostFigure)

var firstPostImage = document.createElement('img')
firstPostImage.src = '1.jpg'
firstPostFigure.appendChild(firstPostImage)
firstPostImage.style.width = '300px'

var firstPostFooter = document.createElement('footer')
firstPostDiv.appendChild(firstPostFooter)

var firstPostFooterSection = document.createElement('section')
firstPostFooter.appendChild(firstPostFooterSection)

var firstPostFooterSectionFirstA = document.createElement('a')
firstPostFooterSectionFirstA.innerText = '♥'
firstPostFooterSectionFirstA.style.fontSize = '200%'
firstPostFooterSection.appendChild(firstPostFooterSectionFirstA)

var firstPostDescriptionText = document.createElement('p')
firstPostDescriptionText.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime quibusdam officia adipisci dolor ducimus inventore numquam expedita reprehenderit, quaerat sit quam tempore laboriosam fuga eaque, eius consectetur totam eligendi rerum ad in praesentium excepturi. Non velit perferendis blanditiis dignissimos.'
firstPostFooter.appendChild(firstPostDescriptionText)

// post 2

var secondPostDiv = document.createElement('article')
postArticleDiv.appendChild(secondPostDiv)

var secondPostHeader = document.createElement('header')
secondPostDiv.appendChild(secondPostHeader)

var secondPostTitle = document.createElement('h2')
secondPostTitle.innerText = 'Post 2 Title'
secondPostHeader.appendChild(secondPostTitle)

var secondPostFigure = document.createElement('figure')
secondPostDiv.appendChild(secondPostFigure)

var secondPostImage = document.createElement('img')
secondPostImage.src = '2.jpg'
secondPostFigure.appendChild(secondPostImage)
secondPostImage.style.width = '300px'

var secondPostFooter = document.createElement('footer')
secondPostDiv.appendChild(secondPostFooter)

var secondPostFooterSection = document.createElement('section')
secondPostFooter.appendChild(secondPostFooterSection)

var secondPostFooterSectionFirstA = document.createElement('a')
secondPostFooterSectionFirstA.innerText = '♥'
secondPostFooterSectionFirstA.style.fontSize = '200%'
secondPostFooterSection.appendChild(secondPostFooterSectionFirstA)

var secondPostDescriptionText = document.createElement('p')
secondPostDescriptionText.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus maxime quibusdam officia adipisci dolor ducimus inventore numquam expedita reprehenderit, quaerat sit quam tempore laboriosam fuga eaque, eius consectetur totam eligendi rerum ad in praesentium excepturi. Non velit perferendis blanditiis dignissimos.'
secondPostFooter.appendChild(secondPostDescriptionText)






/*
var img2 = document.createElement('img')
img2.src = '2.jpg'
postArticleDiv.appendChild(img2)
img2.style.width = '300px'

var img3 = document.createElement('img')
img3.src = '3.jpg'
postArticleDiv.appendChild(img3)
img3.style.width = '300px'

var img4 = document.createElement('img')
img4.src = '4.jpg'
postArticleDiv.appendChild(img4)
img4.style.width = '300px'

*/


