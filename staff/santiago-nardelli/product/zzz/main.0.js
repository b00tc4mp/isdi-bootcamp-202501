console.clear()
console.log('Hello, App!')

/*
Creo una SAP de inicio de secion 
Dentro de ella la primera visual va a ser mi logo debajo de el un login/register 


*/

var logo = document.createElement('div')
document.body.appendChild(logo)

var logoHome = document.createElement('h1')
logo.appendChild(logoHome)

var logoLink = document.createElement('a')
logoHome.appendChild(logoLink)

var logoText = document.createTextNode('Logo')
logoLink.appendChild(logoText)




// Crear y agregar el enlace de Login
var loginLink = document.createElement('a');
loginLink.href = '#'; // Añadir href al enlace
loginLink.textContent = 'Login'; // Añadir texto al enlace
document.body.appendChild(loginLink);



// Crear y agregar el enlace de Register
var registerLink = document.createElement('a');
registerLink.href = '#'; // Añadir href al enlace
registerLink.textContent = 'Register'; // Añadir texto al enlace
document.body.appendChild(registerLink);









// home

var home = document.createElement('div')
document.body.appendChild(home)