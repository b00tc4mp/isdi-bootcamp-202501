console.clear()
console.log('Hello, App!')



function showScreen(screen) {
    landing.style.display = 'none';
    register.style.display = 'none';
    login.style.display = 'none';
    home.style.display = 'none';

    if (screen === 'landing') landing.style.display = 'block';
    if (screen === 'register') register.style.display = 'block';
    if (screen === 'login') login.style.display = 'block';
    if (screen === 'home') home.style.display = 'block';
}


// landing

var landing = document.createElement('div')
document.body.appendChild(landing)

var landingLogo = document.createElement('h1')
landing.appendChild(landingLogo)

var landingLogoText = document.createTextNode('Logo')
landingLogo.appendChild(landingLogoText)

//enlace register
var landingRegisterAnchor = document.createElement('a')
landingRegisterAnchor.href = '#' 
landingRegisterAnchor.onclick = function() {
   showScreen('register')
}

landingRegisterAnchor.appendChild(document.createTextNode('Register'))
landing.appendChild(landingRegisterAnchor)

//texto "or"
var landingOrspan = document.createElement('span')
landingOrspan.innerHTML = ' &nbsp;or&nbsp; '
landing.appendChild(landingOrspan)

//Login



var landingLoginAnchor = document.createElement('a')
landingLoginAnchor.href = '#'
landingLoginAnchor.onclick = function() {
    showScreen('login')
}

var landingLoginAnchorText = document.createTextNode('Login')
landingLoginAnchor.appendChild(landingLoginAnchorText)
landing.appendChild(landingLoginAnchor)

//register

var register = document.createElement('div')
document.body.appendChild(register)
register.style.display = 'none'

var registerLogo = document.createElement('h1')
register.appendChild(registerLogo)

var registerLogoText = document.createTextNode('Register')
registerLogo.appendChild(registerLogoText)

//Crear formulario
var registerForm = document.createElement('form')
register.appendChild(registerForm)

//funcion para crear un campo input
function createInput(labelText, type, form) {
var label = document.createElement('label')
label.innerText = labelText
var input = document.createElement('input')
input.type = type
input.required = true

input.style.display = 'block'
input.style.marginBottom = '10px'
form.appendChild(label)
form.appendChild(input)
return input


}

// crear campos nombre email username y pasword

var nameInput = createInput('Name', 'text', registerForm)
var emailInput = createInput('E-mail', 'e-mail', registerForm)
var usernameInput = createInput('Username', 'text', registerForm)
var passwordInput = createInput('Password', 'password', registerForm)


//boton register
var registerButton = document.createElement('button')
registerButton.innerText = 'Register'
registerButton.style.marginTop = '10px'
registerButton.type = 'submit'
registerForm.appendChild(registerButton)


//boton para guardar los cambios en la consola

registerForm.onsubmit = function(event) {
event.preventDefault()
console.log('User registred:', {
name: nameInput.value,
email: emailInput.value,
username: usernameInput.value,
password: passwordInput.value

})

alert('Usuario registrado correctamente!')
showScreen('login')

}


//boton para volver a la landing

var backToLanding = document.createElement('button')
backToLanding.innerText = 'Back'
backToLanding.style.marginTop = '10px'
backToLanding.onclick = function() {
    showScreen('landing')
}
register.appendChild(backToLanding)

// login

var login = document.createElement('div')
document.body.appendChild(login)
login.style.display = 'none'

//titulo
var loginLogo = document.createElement('h1');
loginLogo.appendChild(document.createTextNode('Login'))
login.appendChild(loginLogo)


//crear forumario
var loginForm = document.createElement('form');
login.appendChild(loginForm)

// inputs dentro de formulario

var loginUsernameInput = createInput('Username','text', loginForm)
var loginPasswordInput = createInput('Password', 'password', loginForm)

//boton de login

var loginButton = document.createElement('button')
loginButton.innerText = 'Login'
loginButton.style.marginTop = '10px'
loginButton.type = 'submit'
loginForm.appendChild(loginButton)

//simulacion loggin

loginForm.onsubmit = function(event) {
event.preventDefault()

//credenciales
var predefinedUsername = 'usuario123'
var predefinedPassword = 'password123'

//comprovamos si el nombre de usuario y la conraseña es correcto

if (loginUsernameInput.value === predefinedUsername && loginPasswordInput.value === predefinedPassword ) {
   console.log('Login exitoso')
alert('Login exitoso!')
showScreen('home')

} else {
  alert('Nombre incorrecto, intentalo de nuevo')
}
}



//boton para volver a landing desde login
var backToLandingFromLogin = document.createElement('button')
backToLandingFromLogin.innerText = 'back'
backToLandingFromLogin.style.marginTop = '10px'
backToLandingFromLogin.onclick = function() {
    showScreen('landing')
}

login.appendChild(backToLandingFromLogin)


// home

var home = document.createElement('div')
document.body.appendChild(home)
home.style.display = 'none'

var homeLogo = document.createElement('h1')
home.appendChild(homeLogo)


var homeLogoText = document.createTextNode('Bienvenido al inicio')
homeLogo.appendChild(homeLogoText)

// crear imagen

var homeImage = document.createElement('img')
homeImage.src = 'https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg'
homeImage.style.alt = 'Imagen de un bonito paisaje'
homeImage.style.width = '600px'
homeImage.style.display = 'block'
homeImage.style.marginBottom = '10px'
home.appendChild(homeImage)

// boton volver a la pantalla principal

var homeButton = document.createElement('button')
homeButton.innerText = 'volver al inicio'
homeButton.style.marginTop = '10px'
homeButton.style.display = 'block'
homeButton.onclick = function() {
showScreen('landing')
}
home.appendChild(homeButton)


