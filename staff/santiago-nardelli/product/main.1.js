console.clear();
console.log('Hello, App!');

/*
Creo una SAP de inicio de sesión 
Dentro de ella:
1-La primera visual va a ser mi logo debajo de él los imputs de ingreso de usuario y despues  un login/register 
2- La segunda visual va a ser el logo y un formulario de registro con los campos de nombre, apellido, email, contraseña y confirmar contraseña
3- La tercera visual va a ser la sap ya logueado con un mensaje de bienvenida y un boton de logout
*/

//========================================= Crear el contenedor principal==========================================================
var container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';

container.style.backgroundColor = '#1a1a1a'; // Fondo de la página

container.style.height = '300vh';
document.body.appendChild(container);// container es hijo de body

//========================================== Crear contenedor para el logo=============================================================
var boxLogo = document.createElement('div');
boxLogo.style.display = 'flex';
boxLogo.style.flexDirection = 'column';
boxLogo.style.alignItems = 'center';
boxLogo.style.padding = '20px';
boxLogo.style.marginTop = '20px';
container.appendChild(boxLogo);// boxLogo es hijo de container

//============================================ Crear y agregar el logo ================================================================
var logoHome = document.createElement('h1');
var logoLink = document.createElement('a');
logoLink.href = '#';
logoLink.style.textDecoration = 'none';// Quitar subrayado al enlac
logoLink.style.fontWeight = 'bold'; // Poner en negrita
logoLink.style.fontSize = '50px'; // Tamaño de la fuente
logoLink.style.fontFamily = 'Georgia, serif'
logoLink.style.color = '#00d4ff' // Color del texto



// Crear el ícono de Font Awesome
var logoIcon = document.createElement('i'); // Crear un elemento i para el ícono de Font Awesome
logoIcon.className = 'fa-solid fa-user-secret'; // Clase de Font Awesome para el ícono de casa
logoLink.appendChild(logoIcon);// logoIcon es hijo de logoLink

logoHome.appendChild(logoLink);// logoLink es hijo de logoHome
boxLogo.appendChild(logoHome);// logoHome es hijo de boxLogo

//============================================ Crear contenedor para los inputs=========================================================
var boxInputs = document.createElement('div');
boxInputs.style.display = 'flex';
boxInputs.style.flexDirection = 'column';
boxInputs.style.alignItems = 'center';
boxInputs.style.marginTop = '20px';
container.appendChild(boxInputs);// boxInputs es hijo de container

//============================================== Crear y agregar los inputs==============================================================
var inputEmail = document.createElement('input');
inputEmail.type = 'email';
inputEmail.placeholder = 'Enter your email';
inputEmail.style.margin = '10px';
inputEmail.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputEmail.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputEmail.style.color = '#00d4ff'; // Texto azul claro futurista
boxInputs.appendChild(inputEmail);// inputEmail es hijo de boxInputs

var inputPassword = document.createElement('input');
inputPassword.type = 'password';
inputPassword.placeholder = 'Enter your password';
inputPassword.style.margin = '10px';
inputPassword.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputPassword.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputPassword.style.color = '#00d4ff'; // Texto azul claro futurista
boxInputs.appendChild(inputPassword);// inputPassword es hijo de boxInputs

//========================================== Crear contenedor para los enlaces=============================================================
var boxLinks = document.createElement('div');
boxLinks.style.display = 'flex';
boxLinks.style.flexDirection = 'row';
boxLinks.style.alignItems = 'center';
boxLinks.style.marginTop = '20px';
container.appendChild(boxLinks);// boxLinks es hijo de container

//===============================================Crear y agregar el enlace de Login========================================================
var loginLink = document.createElement('a');
loginLink.href = '#'; // Añadir href al enlace
loginLink.style.textDecoration = 'none'; // Quitar subrayado al enlace
loginLink.style.fontFamily = 'Georgia, serif'
loginLink.textContent = 'Login'; // Añadir texto al enlace
loginLink.style.margin = '10px'; // Añadir margen
loginLink.style.color = '#00d4ff'; // Color azul claro futurista
boxLinks.appendChild(loginLink);// loginLink link es hijo de box link

//=========================================== Crear y agregar el texto "or"=================================================================
var orText = document.createElement('span');
orText.textContent = 'or';
orText.style.fontFamily = 'Georgia, serif'
orText.style.margin = '10px'; // Añadir margen
orText.style.color = '#00d4ff'; // Color azul claro futurista
boxLinks.appendChild(orText);// orText es hijo de box link

//============================================= Crear y agregar el enlace de Register=======================================================
var registerLink = document.createElement('a');
registerLink.href = '#'; // Añadir href al enlace
registerLink.style.textDecoration = 'none'; // Quitar subrayado al enlace
registerLink.textContent = 'Register'; // Añadir texto al enlace
registerLink.style.fontFamily = 'Georgia, serif'
registerLink.style.margin = '10px'; // Añadir margen
registerLink.style.color = '#00d4ff'; // Color azul claro futurista
boxLinks.appendChild(registerLink);// register link es hijo de box link



//============================================= Crear contenedor para el formulario de registro===========================================

var boxRegister = document.createElement('div');
boxRegister.style.display = 'flex';
boxRegister.style.flexDirection = 'column';
boxRegister.style.alignItems = 'center';
boxRegister.style.marginTop = '300px';
container.appendChild(boxRegister);// boxRegister es hijo de container

//============================================= Crear y agregar el formulario de registro===============================================
var formRegister = document.createElement('form');
formRegister.style.display = 'flex';
formRegister.style.flexDirection = 'column';
formRegister.style.alignItems = 'center';
formRegister.style.marginTop = '20px';
boxRegister.appendChild(formRegister);// formRegister es hijo de boxRegister

var inputName = document.createElement('input');
inputName.type = 'text';
inputName.placeholder = 'Enter your name';
inputName.style.margin = '10px';
inputName.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputName.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputName.style.color = '#00d4ff'; // Texto azul claro futurista
formRegister.appendChild(inputName);// inputName es hijo de formRegister

var inputLastName = document.createElement('input');
inputLastName.type = 'text';
inputLastName.placeholder = 'Enter your last name';
inputLastName.style.margin = '10px';
inputLastName.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputLastName.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputLastName.style.color = '#00d4ff'; // Texto azul claro futurista
formRegister.appendChild(inputLastName);// inputLastName es hijo de formRegister

var inputEmailRegister = document.createElement('input');   
inputEmailRegister.type = 'email';
inputEmailRegister.placeholder = 'Enter your email';
inputEmailRegister.style.margin = '10px';
inputEmailRegister.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputEmailRegister.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputEmailRegister.style.color = '#00d4ff'; // Texto azul claro futurista
formRegister.appendChild(inputEmailRegister);// inputEmailRegister es hijo de formRegister

var inputPasswordRegister = document.createElement('input');
inputPasswordRegister.type = 'password';
inputPasswordRegister.placeholder = 'Enter your password';
inputPasswordRegister.style.margin = '10px';
inputPasswordRegister.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputPasswordRegister.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputPasswordRegister.style.color = '#00d4ff'; // Texto azul claro futurista
formRegister.appendChild(inputPasswordRegister);// inputPasswordRegister es hijo de formRegister

var inputConfirmPassword = document.createElement('input');
inputConfirmPassword.type = 'password';
inputConfirmPassword.placeholder = 'Confirm your password';
inputConfirmPassword.style.margin = '10px';
inputConfirmPassword.style.border = '2px solid #00d4ff'; // Borde azul claro futurista
inputConfirmPassword.style.backgroundColor = '#1a1a1a'; // Fondo oscuro
inputConfirmPassword.style.color = '#00d4ff'; // Texto azul claro futurista
formRegister.appendChild(inputConfirmPassword);// inputConfirmPassword es hijo de formRegister

//============================================= Crear contenedor para el mensaje de bienvenida===========================================
var boxWelcome = document.createElement('div');
boxWelcome.style.display = 'flex';
boxWelcome.style.flexDirection = 'column';
boxWelcome.style.alignItems = 'center';
boxWelcome.style.marginTop = '300px';
container.appendChild(boxWelcome);// boxWelcome es hijo de container

//============================================= Crear y agregar el mensaje de bienvenida==================================================
var welcomeMessage = document.createElement('h2');
welcomeMessage.textContent = 'Welcome!';
welcomeMessage.style.fontFamily = 'Georgia, serif'
welcomeMessage.style.color = '#00d4ff'; // Color azul claro futurista
boxWelcome.appendChild(welcomeMessage);// welcomeMessage es hijo de boxWelcome



