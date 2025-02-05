console.clear();
console.log("Hello, App!");

/*
Creo una SAP de inicio de sesión 
Dentro de ella:
1- creo mi seccion de registro donde tendre mi logo los imputs de email y pass y si no esta logueado la opcion para registrarse 
Esto me conllevara crear a partir del body--> una section --> 3 divs o imputs en el caso de las demas secciones
esto lo logro definiendo mi container y a partir de el creo con el metodo createElement('LA ETIQUETAS SEMANTICAS DE HTML')
Y lo invoco con el metodo appendChild--> con estos dos metodos especifico tambien la relacion padre e hijo


2- para montar y desmontar y "navegar" dentro de mi app utilizo el evento addEventListener que es una funcion que declaro y me permite dentro de ella utilizar el remuveChild y el nombre del "componente a retirar"
y consecuente el appendChild("con el nombre del que quiero montar")

*/

//========================================= Crear el contenedor principal==========================================================S1
var container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.backgroundColor = "#1a1a1a"; // Fondo de la página
container.style.height = "800vh";
document.body.appendChild(container); // container es hijo de body

//=========================================== Crear la sección 1 (login)=================================================================S1
var section1 = document.createElement("section");
section1.style.display = "flex";
section1.style.flexDirection = "column";
section1.style.alignItems = "center";
container.appendChild(section1);

//========================================== Crear contenedor para el logo=============================================================S1
var boxLogo = document.createElement("div");
boxLogo.style.display = "flex";
boxLogo.style.flexDirection = "column";
boxLogo.style.alignItems = "center";
boxLogo.style.padding = "20px";
boxLogo.style.marginTop = "20px";
section1.appendChild(boxLogo); // boxLogo es hijo de container

//============================================ Crear y agregar el logo ================================================================S1
var logoHome = document.createElement("h1");
var logoLink = document.createElement("a");
logoLink.href = "#";
logoLink.style.textDecoration = "none"; // Quitar subrayado al enlac
logoLink.style.fontWeight = "bold"; // Poner en negrita
logoLink.style.fontSize = "50px"; // Tamaño de la fuente
logoLink.style.fontFamily = "Georgia, serif";
logoLink.style.color = "#00d4ff"; // Color del texto

// ===================================================Crear el ícono de Font Awesome=======================================================S1

var logoIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
logoIcon.className = "fa-solid fa-user-secret"; // Clase de Font Awesome para el ícono de casa
logoLink.appendChild(logoIcon); // logoIcon es hijo de logoLink

logoHome.appendChild(logoLink); // logoLink es hijo de logoHome
boxLogo.appendChild(logoHome); // logoHome es hijo de boxLogo

//============================================ Crear contenedor para los inputs=========================================================S1

var boxInputs = document.createElement("div");
boxInputs.style.display = "flex";
boxInputs.style.flexDirection = "column";
boxInputs.style.alignItems = "center";
boxInputs.style.marginTop = "20px";
section1.appendChild(boxInputs); // boxInputs es hijo de container

//============================================== Crear y agregar los inputs==============================================================S1
var inputEmail = document.createElement("input");
inputEmail.type = "email";
inputEmail.placeholder = "Enter your email";
inputEmail.style.margin = "10px";
inputEmail.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputEmail.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputEmail.style.color = "#00d4ff"; // Texto azul claro futurista
boxInputs.appendChild(inputEmail); // inputEmail es hijo de boxInputs

var inputPassword = document.createElement("input");
inputPassword.type = "password";
inputPassword.placeholder = "Enter your password";
inputPassword.style.margin = "10px";
inputPassword.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputPassword.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputPassword.style.color = "#00d4ff"; // Texto azul claro futurista
boxInputs.appendChild(inputPassword); // inputPassword es hijo de boxInputs

//========================================== Crear contenedor para los enlaces=============================================================S1
var boxLinks = document.createElement("div");
boxLinks.style.display = "flex";
boxLinks.style.flexDirection = "row";
boxLinks.style.alignItems = "center";
boxLinks.style.marginTop = "20px";
section1.appendChild(boxLinks); // boxLinks es hijo de container

//===============================================Crear y agregar el enlace de Login========================================================S1
var loginLink = document.createElement("a");
loginLink.href = "#"; // Añadir href al enlace
loginLink.style.textDecoration = "none"; // Quitar subrayado al enlace
loginLink.style.fontFamily = "Georgia, serif";
loginLink.textContent = "Login"; // Añadir texto al enlace
loginLink.style.margin = "10px"; // Añadir margen
loginLink.style.color = "#00d4ff"; // Color azul claro futurista
boxLinks.appendChild(loginLink); // loginLink link es hijo de box link

//=========================================== Crear y agregar el texto "or"=================================================================S1
var orText = document.createElement("span");
orText.textContent = "or";
orText.style.fontFamily = "Georgia, serif";
orText.style.margin = "10px"; // Añadir margen
orText.style.color = "#00d4ff"; // Color azul claro futurista
boxLinks.appendChild(orText); // orText es hijo de box link

//============================================= Crear y agregar el enlace de Register=======================================================S1
var registerLink = document.createElement("a");
registerLink.href = "#"; // Añadir href al enlace
registerLink.style.textDecoration = "none"; // Quitar subrayado al enlace
registerLink.textContent = "Register"; // Añadir texto al enlace
registerLink.style.fontFamily = "Georgia, serif";
registerLink.style.margin = "10px"; // Añadir margen
registerLink.style.color = "#00d4ff"; // Color azul claro futurista
boxLinks.appendChild(registerLink); // registerLink es hijo de boxLinks

registerLink.addEventListener("click", function () {
  //  Eliminar el formulario de login
  //  Mostrar la sección 2
  container.removeChild(section1);
  container.appendChild(section2);
});
//============================================= Crear contenedor para el formulario de registro===========================================S2

var section2 = document.createElement("section");
section2.style.display = "flex";
section2.style.flexDirection = "column";
section2.style.alignItems = "center";
//container.appendChild(section2)

var boxRegister = document.createElement("div");
boxRegister.style.display = "flex";
boxRegister.style.flexDirection = "column";
boxRegister.style.alignItems = "center";
section2.appendChild(boxRegister); // boxRegister es hijo de container

//============================================= Crear y agregar el formulario de registro===============================================S2

//Creo el formato formulario
var formRegister = document.createElement("form");
formRegister.style.display = "flex";
formRegister.style.flexDirection = "column";
formRegister.style.alignItems = "center";
formRegister.style.marginTop = "20px";
boxRegister.appendChild(formRegister); // formRegister es hijo de boxRegister

//Creo el titulo para el primer input
var registerTitle = document.createElement("h2");
registerTitle.textContent = "Register";
registerTitle.style.fontFamily = "Georgia, serif";
registerTitle.style.color = "#00d4ff"; // Color azul claro futurista
formRegister.appendChild(registerTitle); // registerTitle es hijo de formRegister

//Creo el titulo
var registerTitleName = document.createElement("h3");
registerTitleName.textContent = "Enter your data";
registerTitleName.style.fontFamily = "Georgia, serif";
registerTitleName.style.color = "#00d4ff"; // Color azul claro futurista
formRegister.appendChild(registerTitleName);

//Creo el input para el name
var inputName = document.createElement("input");
inputName.type = "text";
inputName.placeholder = "Enter your name";
inputName.style.margin = "10px";
inputName.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputName.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputName.style.color = "#00d4ff"; // Texto azul claro futurista
formRegister.appendChild(inputName); // inputName es hijo de formRegister

//Creo el input para el apellido
var inputLastName = document.createElement("input");
inputLastName.type = "text";
inputLastName.placeholder = "Enter your last name";
inputLastName.style.margin = "10px";
inputLastName.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputLastName.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputLastName.style.color = "#00d4ff"; // Texto azul claro futurista
formRegister.appendChild(inputLastName); // inputLastName es hijo de formRegister

//Creo el input para el email
var inputEmailRegister = document.createElement("input");
inputEmailRegister.type = "email";
inputEmailRegister.placeholder = "Enter your email";
inputEmailRegister.style.margin = "10px";
inputEmailRegister.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputEmailRegister.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputEmailRegister.style.color = "#00d4ff"; // Texto azul claro futurista
formRegister.appendChild(inputEmailRegister); // inputEmailRegister es hijo de formRegister

//Creo el input para la contraseña
var inputPasswordRegister = document.createElement("input");
inputPasswordRegister.type = "password";
inputPasswordRegister.placeholder = "Enter your password";
inputPasswordRegister.style.margin = "10px";
inputPasswordRegister.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputPasswordRegister.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputPasswordRegister.style.color = "#00d4ff"; // Texto azul claro futurista
formRegister.appendChild(inputPasswordRegister); // inputPasswordRegister es hijo de formRegister

//Creo el input para confirmar la contraseña
var inputConfirmPassword = document.createElement("input");
inputConfirmPassword.type = "password";
inputConfirmPassword.placeholder = "Confirm your password";
inputConfirmPassword.style.margin = "10px";
inputConfirmPassword.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
inputConfirmPassword.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
inputConfirmPassword.style.color = "#00d4ff"; // Texto azul claro futurista
formRegister.appendChild(inputConfirmPassword); // inputConfirmPassword es hijo de formRegister

// Crear botón de registro
var buttonRegister = document.createElement("button");
buttonRegister.textContent = "Register";
buttonRegister.style.margin = "10px";
buttonRegister.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
buttonRegister.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
buttonRegister.style.color = "#00d4ff"; // Texto azul claro futurista
buttonRegister.style.transition = "background-color 0.3s, color 0.3s"; // Transición suave

// Agregar evento de hover
buttonRegister.addEventListener("mouseover", function () {
  buttonRegister.style.backgroundColor = "#00d4ff"; // Fondo azul claro futurista
  buttonRegister.style.color = "#1a1a1a"; // Texto oscuro
});
// Agregar evento de salida
buttonRegister.addEventListener("mouseout", function () {
  buttonRegister.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
  buttonRegister.style.color = "#00d4ff"; // Texto azul claro futurista
});

// Agregar evento al botón de registro
buttonRegister.addEventListener("click", function () {
  alert("Registro exitoso!");
  //  Eliminar el formulario de registro
  //  Mostrar la sección 3
  container.removeChild(section2);
  container.appendChild(section3);
});
formRegister.appendChild(buttonRegister);

//============================================CREO LA SECTION 3 ========================================================================

var section3 = document.createElement("section");
section3.style.display = "flex";
section3.style.flexDirection = "column";
section3.style.alignItems = "center";
//container.appendChild(section3)// section 3 es hijo de container

//============================================= Crear contenedor para el mensaje de bienvenida===========================================S3
var boxWelcome = document.createElement("div");
boxWelcome.style.display = "flex";
boxWelcome.style.flexDirection = "column";
boxWelcome.style.alignItems = "center";
//boxWelcome.style.marginTop = '300px';
section3.appendChild(boxWelcome); // boxWelcome es hijo de S3

//============================================= Crear y agregar el mensaje de bienvenida==================================================S3

var logoHomeIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
logoHomeIcon.className = "fa-solid fa-user-secret"; // Clase de Font Awesome para el ícono de casa
logoHomeIcon.style.fontSize = "50px"; // Tamaño de la fuente
logoHomeIcon.style.marginTop = "20px"; // Margen superior
logoHomeIcon.style.color = "#00d4ff"; // Color del texto
boxWelcome.appendChild(logoHomeIcon); // logoIcon es hijo de logoLink

logoHomeIcon.addEventListener("click", function () {
  //  Eliminar el formulario de registro
  //  Mostrar la sección 1
  container.removeChild(section3);
  container.appendChild(section1);
});

//=================================CREO CONTENEDOR DE MIS CARDS============================================================================S3

var boxCards = document.createElement("div");
boxCards.style.display = "flex";
//boxCards.style.flexDirection = 'column';
boxCards.style.flexDirection = "row"; // Las cards se colocan en fila
boxCards.style.justifyContent = "space-between"; // Espacio entre las cards
boxCards.style.width = "100%"; // Ocupa todo el ancho del contenedor
boxCards.style.flexWrap = "wrap"; // Las cards se colocan en la siguiente línea si no entran en el ancho
boxCards.style.marginTop = "20px";
section3.appendChild(boxCards);

// Crear y agregar las cards
for (let i = 0; i < 8; i++) {
  var card = document.createElement("article");
  card.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
  card.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
  card.style.color = "#00d4ff"; // Texto azul claro futurista
  card.style.margin = "10px";
  card.style.padding = "100px";
  card.style.flex = "1"; // Cada card ocupa el mismo espacio
  card.style.textAlign = "center";
  card.textContent = `Card ${i + 1}`; // Agregar texto a la card
  boxCards.appendChild(card); // card es hijo de boxCards

}
