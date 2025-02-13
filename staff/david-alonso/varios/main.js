console.clear()


// LOGIN

var login = document.createElement('div')
login.style.textAlign = 'center'
document.body.appendChild(login)

var logo = document.createElement('h1')
logo.textContent = 'LOGIN'
logo.style.color = 'rgb(255, 119, 8)'
logo.style.textShadow = '0.1em 0.1em #255'
login.appendChild(logo)

var form = document.createElement('form')
login.appendChild(form)

// Nombre
var espacio = document.createElement('br')
login.appendChild(espacio)

var loginNameImput = document.createElement('input')
loginNameImput.placeholder = 'Nombre'
login.appendChild(loginNameImput)

var espacio = document.createElement('br')
login.appendChild(espacio)

// Contraseña
var espacio = document.createElement('br')
login.appendChild(espacio)

var loginContraseñaInput = document.createElement('input')
loginContraseñaInput.placeholder = 'Contraseña'
login.appendChild(loginContraseñaInput)

var espacio = document.createElement('br')
login.appendChild(espacio)
var espacio = document.createElement('br')
login.appendChild(espacio)

// 
var loginAnchor = document.createElement('a')
loginAnchor.textContent = 'Login'
loginAnchor.style.color = 'rgb(255, 119, 8)'
loginAnchor.style.textDecoration = 'underline'
loginAnchor.style.textUnderlinePosition = 'under'
login.appendChild(loginAnchor)

var orText = document.createElement('text')
orText.textContent = ' ~ ~ ~ ~ ~ ~ '
login.appendChild(orText)

var loginAnchor = document.createElement('a')
loginAnchor.textContent = 'Registro'
loginAnchor.style.color = 'rgb(255, 119, 8)'
loginAnchor.style.textDecoration = 'underline'
loginAnchor.style.textUnderlinePosition = 'under'
login.appendChild(loginAnchor)


// REGISTRO

var register = document.createElement('div')
register.style.textAlign = 'center'
document.body.appendChild(register)

var logo = document.createElement('h1')
logo.textContent = 'REGISTRO'
logo.style.color = 'rgb(255, 119, 8)'
logo.style.textShadow = '0.1em 0.1em #255'
register.appendChild(logo)

var form = document.createElement('form')
register.appendChild(form)

// Nombre
var espacio = document.createElement('br')
register.appendChild(espacio)

var registerNameInput = document.createElement('input')
registerNameInput.placeholder = 'Nombre'
register.appendChild(registerNameInput)

var espacio = document.createElement('br')
register.appendChild(espacio)

// E-mail
var espacio = document.createElement('br')
register.appendChild(espacio)

var registerEmailInput = document.createElement('input')
registerEmailInput.placeholder = 'E-mail'
register.appendChild(registerEmailInput)

var espacio = document.createElement('br')
register.appendChild(espacio)

// Username
var espacio = document.createElement('br')
register.appendChild(espacio)

var registerUsernameInput = document.createElement('input')
registerUsernameInput.placeholder = 'Nombre de usuario'
register.appendChild(registerUsernameInput)

var espacio = document.createElement('br')
register.appendChild(espacio)

// Conraseña 
var espacio = document.createElement('br')
register.appendChild(espacio)

var registerPasswordInput = document.createElement('input')
registerPasswordInput.placeholder = 'Contraseña'
register.appendChild(registerPasswordInput)

var espacio = document.createElement('br')
register.appendChild(espacio)
var espacio = document.createElement('br')
register.appendChild(espacio)

// 
var registerAnchor = document.createElement('a')
registerAnchor.textContent = 'Registro'
registerAnchor.style.color = 'rgb(255, 119, 8)'
registerAnchor.style.textDecoration = 'underline'
registerAnchor.style.textUnderlinePosition = 'under'
register.appendChild(registerAnchor)

var orText = document.createElement('text')
orText.textContent = ' ~ ~ ~ ~ ~ ~ '
register.appendChild(orText)

var registerAnchor = document.createElement('a')
registerAnchor.textContent = 'Login'
registerAnchor.style.color = 'rgb(255, 119, 8)'
registerAnchor.style.textDecoration = 'underline'
registerAnchor.style.textUnderlinePosition = 'under'
register.appendChild(registerAnchor)












