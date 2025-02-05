console.clear()

// LANDING

let landing = document.createElement('div')
document.body.appendChild(landing)

let landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

//let landingLogoText = new Text('Logo')
let landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)

//register landing
let registerAnchor = document.createElement('a');
registerAnchor.style.cursor = 'pointer'
let registerAnchorText = document.createTextNode('Register');
registerAnchor.appendChild(registerAnchorText)
registerAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(registerDiv)
})
landing.appendChild(registerAnchor);

//login landing
let loginAnchor = document.createElement('a');
loginAnchor.style.cursor = 'pointer'
let loginAnchorText = document.createTextNode('Login');
loginAnchor.appendChild(loginAnchorText);
loginAnchor.addEventListener('click', function () {
    document.body.removeChild(landing)
    document.body.appendChild(loginDiv)
})
loginAnchor.style.marginLeft = '25px'
landing.appendChild(loginAnchor);


// REGISTER

let registerDiv = document.createElement('div');
registerDiv.id = 'register_div';
//document.body.appendChild(registerDiv);

let registerLogo = document.createElement('h1');
registerDiv.appendChild(registerLogo)
let registerLogoText = document.createTextNode('Logo');
registerLogo.appendChild(registerLogoText);

//Form

let registerForm = document.createElement('form');
registerDiv.appendChild(registerForm);
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    document.body.removeChild(registerDiv);
    document.body.appendChild(loginDiv);
})
registerForm.style.display = 'flex'
registerForm.style.flexDirection = 'column'
registerForm.style.width = '250px'

//Name Form
let nameFormRegisterLabel = document.createElement('label')
nameFormRegisterLabel.textContent = 'Name'
registerForm.appendChild(nameFormRegisterLabel);
let inputName = document.createElement('input');
registerForm.appendChild(inputName);

//Email form
let emailFormRegisterLabel = document.createElement('label')
emailFormRegisterLabel.textContent = 'Email';
registerForm.appendChild(emailFormRegisterLabel);
let inputEmail = document.createElement('input');
registerForm.appendChild(inputEmail)

//Username form
let usernameFormRegisterLabel = document.createElement('label')
usernameFormRegisterLabel.textContent = 'Username';
registerForm.appendChild(usernameFormRegisterLabel);
let inputUsername = document.createElement('input');
registerForm.appendChild(inputUsername);

//Password form
let passwordFormRegisterLabel = document.createElement('label')
passwordFormRegisterLabel.textContent = 'Password'
registerForm.appendChild(passwordFormRegisterLabel)
let inputPassword = document.createElement('input')
registerForm.appendChild(inputPassword)

//Div register buttons

let buttonsFormDivRegister = document.createElement('div')
buttonsFormDivRegister.style.display = 'flex'
buttonsFormDivRegister.style.flexDirection = 'row'
registerForm.appendChild(buttonsFormDivRegister);

//Login anchor
let registerLoginAnchor = document.createElement('a');
registerLoginAnchor.style.cursor = 'pointer'
buttonsFormDivRegister.appendChild(registerLoginAnchor);

registerLoginAnchor.addEventListener('click', function () {
    document.body.removeChild(registerDiv)
    document.body.appendChild(loginDiv)
})
let registerLoginAnchorText = document.createTextNode('Login')
registerLoginAnchor.appendChild(registerLoginAnchorText)

//Register button
let registerButton = document.createElement('button');
registerButton.style.marginLeft = '50px'
registerButton.type = 'submit'
buttonsFormDivRegister.appendChild(registerButton);

let registerButtonText = document.createTextNode('Register');
registerButton.appendChild(registerButtonText);

// LOGIN

let loginDiv = document.createElement('div');
loginDiv.id = 'login_div'
//document.body.appendChild(loginDiv);

let LoginLogo = document.createElement('h1');
loginDiv.appendChild(LoginLogo)
let loginlogoText = document.createTextNode('Logo');
LoginLogo.appendChild(loginlogoText);

//form

let loginForm = document.createElement('form')
loginForm.style.display = 'flex';
loginForm.style.flexDirection = 'column';
loginForm.style.width = '250px';
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    document.body.removeChild(loginDiv)
    document.body.appendChild(homeDiv)
})
loginDiv.appendChild(loginForm)

//Login username label
let loginUsernameLabel = document.createElement('label')
loginUsernameLabel.textContent = 'Username'
loginForm.appendChild(loginUsernameLabel)
let loginInputUsername = document.createElement('input');
loginForm.appendChild(loginInputUsername);

//Login password label
let loginPasswordLabel = document.createElement('label');
loginPasswordLabel.textContent = 'Password';
loginForm.appendChild(loginPasswordLabel);
let loginInputPassword = document.createElement('input')
loginForm.appendChild(loginInputPassword)

//Div login buttons

let buttonsFormDivLogin = document.createElement('div');
buttonsFormDivLogin.style.display = 'flex';
buttonsFormDivLogin.style.flexDirection = 'row';
loginForm.appendChild(buttonsFormDivLogin);

//Register anchor
let loginRegisterAnchor = document.createElement('a');
loginRegisterAnchor.style.cursor = 'pointer'
buttonsFormDivLogin.appendChild(loginRegisterAnchor);
let loginRegisterAnchorText = document.createTextNode('Register');
loginRegisterAnchor.appendChild(loginRegisterAnchorText);

loginRegisterAnchor.addEventListener('click', function () {
    document.body.removeChild(loginDiv)
    document.body.appendChild(registerDiv)
})

//Login button
let loginButton = document.createElement('button');
loginButton.style.marginLeft = '50px';
loginButton.type = 'submit'
buttonsFormDivLogin.appendChild(loginButton);
let loginButtonText = document.createTextNode('Login');
loginButton.appendChild(loginButtonText);

// HOME

let homeDiv = document.createElement('div')
// homeDiv.style.display = 'flex'
// homeDiv.style.flexDirection = 'row'
// homeDiv.style.width = '250px'


let homeLogo = document.createElement('h1')
homeLogo.style.width = '32px'
homeDiv.appendChild(homeLogo)

let homeLogoText = document.createTextNode('Logo')
homeLogo.appendChild(homeLogoText)

let signOutButton = document.createElement('button')
signOutButton.textContent = 'Sign out'
homeDiv.appendChild(signOutButton)
signOutButton.addEventListener('click', function () {
    document.body.removeChild(homeDiv)
    document.body.appendChild(landing)
})

let postsDiv = document.createElement('div')
postsDiv.style.display = 'flex'
postsDiv.style.flexDirection = 'column'
postsDiv.style.width = '250px'
homeDiv.appendChild(postsDiv)

let postContent = document.createElement('article')
postsDiv.appendChild(postContent)


let imgArray = ['https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg', 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=']
imgArray.forEach(function (image) {
    let img = document.createElement('img')
    img.src = image
    postContent.appendChild(img)
})