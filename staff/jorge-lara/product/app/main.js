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
let nameButton = document.createTextNode('Register');
registerAnchor.appendChild(nameButton)
landing.appendChild(registerAnchor);

//login landing
let loginAnchor = document.createElement('a');
let loginName = document.createTextNode('Login');
loginAnchor.appendChild(loginName);
loginAnchor.style.marginLeft = '25px'
landing.appendChild(loginAnchor);


// REGISTER

let registerDiv = document.createElement('div');
document.body.appendChild(registerDiv);

let registerLogo = document.createElement('h1');
registerDiv.appendChild(registerLogo)
let registerLogoText = document.createTextNode('Logo');
registerLogo.appendChild(registerLogoText);

//Form
let formDiv = document.createElement('div');
document.body.appendChild(formDiv);

let formRegister = document.createElement('form');
formDiv.appendChild(formRegister);
formRegister.style.display = 'flex'
formRegister.style.flexDirection = 'column'
formRegister.style.width = '250px'

//Name Form
let nameFormRegister = document.createTextNode('Name');
formRegister.appendChild(nameFormRegister);
let inputName = document.createElement('input');

formRegister.appendChild(inputName);

//Email form
let emailFormRegister = document.createTextNode('Email')
formRegister.appendChild(emailFormRegister)
let inputEmail = document.createElement('input');
formRegister.appendChild(inputEmail)

//Username form
let usernameForm = document.createTextNode('Username');
formRegister.appendChild(usernameForm);
let inputUsername = document.createElement('input');
formRegister.appendChild(inputUsername);

//Password form
let passwordLabel = document.createTextNode('Password')
formRegister.appendChild(passwordLabel)
let inputPassword = document.createElement('input')
formRegister.appendChild(inputPassword)

//Div register buttons

let buttonsFormDivRegister = document.createElement('div')
buttonsFormDivRegister.style.display= 'flex'
buttonsFormDivRegister.style.flexDirection = 'row'
formRegister.appendChild(buttonsFormDivRegister);

//Login anchor
let registerLoginAnchor = document.createElement('a');
buttonsFormDivRegister.appendChild(registerLoginAnchor);

let registerLoginAnchorText = document.createTextNode('Login')
registerLoginAnchor.appendChild(registerLoginAnchorText)

//Register button
let registerButton = document.createElement('button');
registerButton.style.marginLeft = '50px'
buttonsFormDivRegister.appendChild(registerButton);

let registerButtonText = document.createTextNode('Register');
registerButton.appendChild(registerButtonText);

// login

let loginDiv = document.createElement('div');
loginDiv.style.display = 'flex';
loginDiv.style.flexDirection = 'column';
loginDiv.style.width = '250px';
document.body.appendChild(loginDiv);

let LoginLogo = document.createElement('h1');
loginDiv.appendChild(LoginLogo)
let loginlogoText = document.createTextNode('Logo');
LoginLogo.appendChild(loginlogoText);

//form

let loginForm = document.createElement('form')

//Login username label
let loginUsernameForm = document.createTextNode('Username');
loginDiv.appendChild(loginUsernameForm);
let loginInputUsername = document.createElement('input');
loginDiv.appendChild(loginInputUsername);

//Login password label
let loginpasswordLabel = document.createTextNode('Password')
loginDiv.appendChild(loginpasswordLabel)
let loginInputPassword = document.createElement('input')
loginDiv.appendChild(loginInputPassword)

//Div login buttons

let buttonsFormDivLogin = document.createElement('div');
buttonsFormDivLogin.style.display = 'flex';
buttonsFormDivLogin.style.flexDirection = 'row';
loginDiv.appendChild(buttonsFormDivLogin);

//Register anchor
let loginRegisterAnchor = document.createElement('a');
buttonsFormDivLogin.appendChild(loginRegisterAnchor);
let loginRegisterAnchorText = document.createTextNode('Register');
loginRegisterAnchor.appendChild(loginRegisterAnchorText);

//Login button
let loginButton = document.createElement('button');
loginButton.style.marginLeft = '50px';
buttonsFormDivLogin.appendChild(loginButton);
let loginButtonText = document.createTextNode('Login');
loginButton.appendChild(loginButtonText);

// // home

let home = document.createElement('div')
home.style.display = 'flex'
home.style.flexDirection = 'column'
home.style.width = '250px'
document.body.appendChild(home);

let homeLogo = document.createElement('h1')
home.appendChild(homeLogo)

let homeLogoText = document.createTextNode('Logo')
homeLogo.appendChild(homeLogoText)

let posts = document.createElement('div')
home.appendChild(posts)

let postContent = document.createElement('artcile')
posts.appendChild(postContent)

let img = document.createElement('img')
img.src = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
postContent.appendChild(img)
