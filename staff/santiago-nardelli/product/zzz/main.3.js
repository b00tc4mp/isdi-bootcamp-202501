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
// Definir el contenedor principal
// lo declaro afuera de las funciones para que sea global y pueda ser accedido por todas las funciones
// y asi poder montar y desmontar los componentes
//============================================CREO EL CONTENEDOR PRINCIPAL=====================================================================
document.body.style.margin = "0"; // Quitar margen del body

var container = document.createElement("main");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.backgroundColor = "#1a1a1a"; // Fondo de la página
container.style.width = "100vw"; // Ancho de la página
container.style.height = "300vh";
document.body.appendChild(container); // container es hijo de body

//============================================CREO LA CLASE COMPONENT=======================================================================
// Esta funcion constructora me permite crear un objeto que me servira para montar y desmontar los componentes
function Component(container) {
  this.container = container;
}

//============================================CREO LA SECTION 1 ========================================================================
// Creo la seccion de login a partir de la clase Component que me permite montar y desmontar los componentes
var login = new Component(document.createElement("section"));
// Creo el metodo mount que me permite montar el componente en el contenedor principal 'container'
// Esto es un metodo de la clase Component
login.mount = function () {
  // con el this accedo al contenedor de la clase Component
  this.container.style.display = "flex";
  this.container.style.flexDirection = "column";
  this.container.style.alignItems = "center";
  // accedo al contenedor principal y le agrego el componente login
  container.appendChild(this.container); // section 1 es hijo de container

  //========================================== Crear contenedor para el logo=============================================================S1
  var boxLogo = document.createElement("div");
  boxLogo.style.display = "flex";
  boxLogo.style.flexDirection = "column";
  boxLogo.style.alignItems = "center";
  boxLogo.style.padding = "20px";
  boxLogo.style.marginTop = "20px";
  this.container.appendChild(boxLogo); // boxLogo es hijo de container

  //============================================ Crear y agregar el logo ================================================================S1
  var logoHome = document.createElement("div");
  boxLogo.appendChild(logoHome); // logoHome es hijo de boxLogo

  var logoLink = document.createElement("a");
  logoLink.href = "#";
  logoLink.style.fontSize = "50px"; // Tamaño de la fuente
  logoLink.style.color = "#00d4ff"; // Color del texto
  logoHome.appendChild(logoLink); // logoLink es hijo de logoHome

  var logoIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoIcon.className = "fa-solid fa-user-secret"; // Clase de Font Awesome para el ícono de casa
  logoLink.appendChild(logoIcon); // logoIcon es hijo de logoLink

  //============================================ Crear contenedor para los inputs=========================================================S1

  var boxInputs = document.createElement("div");
  boxInputs.style.display = "flex";
  boxInputs.style.flexDirection = "column";
  boxInputs.style.alignItems = "center";
  boxInputs.style.marginTop = "20px";
  this.container.appendChild(boxInputs); // boxInputs es hijo de container

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

  //========================================= Crear contenedor para los enlaces=========================================================S1
  var boxLinks = document.createElement("div");
  boxLinks.style.display = "flex";
  boxLinks.style.flexDirection = "row";
  boxLinks.style.alignItems = "center";
  boxLinks.style.marginTop = "20px";
  this.container.appendChild(boxLinks); // boxLinks es hijo de container

  //========================================Crear y agregar el enlace de Login==========================================================S1
  var loginLink = document.createElement("a");
  loginLink.href = "#"; // Añadir href al enlace
  loginLink.style.textDecoration = "none"; // Quitar subrayado al enlace
  loginLink.style.fontFamily = "Georgia, serif";
  loginLink.textContent = "Login"; // Añadir texto al enlace
  loginLink.style.margin = "10px"; // Añadir margen
  loginLink.style.color = "#00d4ff"; // Color azul claro futurista
  boxLinks.appendChild(loginLink); // loginLink link es hijo de box link

  //======================================= Crear y agregar el texto "or"=================================================================S1
  var orText = document.createElement("span");
  orText.textContent = "or";
  orText.style.fontFamily = "Georgia, serif";
  orText.style.margin = "10px"; // Añadir margen
  orText.style.color = "#00d4ff"; // Color azul claro futurista
  boxLinks.appendChild(orText); // orText es hijo de box link

  //============================================= Crear y agregar el enlace Register=======================================================S1
  var registerLink = document.createElement("a");
  registerLink.href = "#"; // Añadir href al enlace
  registerLink.style.textDecoration = "none"; // Quitar subrayado al enlace
  registerLink.textContent = "Register"; // Añadir texto al enlace
  registerLink.style.fontFamily = "Georgia, serif";
  registerLink.style.margin = "10px"; // Añadir margen
  registerLink.style.color = "#00d4ff"; // Color azul claro futurista
  registerLink.addEventListener(
    "click",
    function () {
      //  Eliminar el formulario de login
      //  Mostrar la sección 2
      container.removeChild(this.container);
      container.appendChild(register.container);
    }.bind(this)
  );
  boxLinks.appendChild(registerLink); // registerLink es hijo de boxLinks
};

/*============================================CREO LA SECTION 2 ==============================================================================================================================================================================================================================================================================================================================================================================
*/
var register = new Component(document.createElement("section"));
register.mount = function () {
  //============================================= Crear contenedor para el formulario de registro===========================================S2=
  this.container.style.display = "flex";
  this.container.style.flexDirection = "column";
  this.container.style.alignItems = "center";

  var boxRegister = document.createElement("div");
  boxRegister.style.display = "flex";
  boxRegister.style.flexDirection = "column";
  boxRegister.style.alignItems = "center";
  this.container.appendChild(boxRegister); // boxRegister es hijo de container

  //============================================= Crear y agregar el formulario de registro===============================================S2
  

  //Creo el formato formulario
  var formRegister = document.createElement("form");
  formRegister.style.display = "flex";
  formRegister.style.flexDirection = "column";
  formRegister.style.alignItems = "center";
  formRegister.style.marginTop = "20px";
  formRegister.style.padding = "20px";
  formRegister.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('Formulario enviado')

    var name = inputName.value
    var lastName = inputLastName.value
    var email = inputEmailRegister.value
    var password = inputPasswordRegister.value
    var confirmPassword = inputConfirmPassword

    
  })
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
  buttonRegister.addEventListener(
    "click",
    function () {
      alert("Registro exitoso!");
      //  Eliminar el formulario de registro
      //  Mostrar la sección 3
      container.removeChild(register.container);
      container.appendChild(home.container);
    }.bind(this)
  );
  formRegister.appendChild(buttonRegister);
};

/*============================================CREO LA SECTION 3 ==============================================================================================================================================================================================================================================================================================================================================================================
*/
var home = new Component(document.createElement("section"));

(home.mount = function () {
  this.container.style.display = "grid";
  this.container.style.gridTemplateAreas = `
    "sidebar navbar "
    "sidebar main"
  `
  this.container.style.gridTemplateRows = 'auto 1fr'
  this.container.style.gridTemplateColumns = ' 100px auto'
  this.container.style.height = 'auto'
  this.container.style.width = '100%'


  //============================================= Crear contenedor para el logo===========================================S3
  var sidebar = document.createElement("div");
  sidebar.style.gridArea = 'sidebar'
  sidebar.style.display = "flex";
  sidebar.style.flexDirection = "column";
  sidebar.style.padding = "20px";
  this.container.appendChild(sidebar); // boxWelcome es hijo de S3

  //============================================= Crear y agregar el mensaje de bienvenida==================================================S3

  var logoHomeIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoHomeIcon.className = "fa-solid fa-user-secret"; // Clase de Font Awesome para el ícono de logoMarca
  logoHomeIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoHomeIcon.style.marginTop = "20px"; // Margen superior
  logoHomeIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoHomeIcon); // logoIcon es hijo de logoLink

  logoHomeIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });

  var logoHeartIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoHeartIcon.className = "fa-solid fa-heart"; // Clase de Font Awesome para el ícono de corazon
  logoHeartIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoHeartIcon.style.marginTop = "20px"; // Margen superior
  logoHeartIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoHeartIcon); // logoIcon es hijo de logoLink

  logoHeartIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });

  var logoMesseageIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoMesseageIcon.className = "fa-solid fa-comments"; // Clase de Font Awesome para el ícono de mensajes
  logoMesseageIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoMesseageIcon.style.marginTop = "20px"; // Margen superior
  logoMesseageIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoMesseageIcon); // logoIcon es hijo de logoLink

  logoMesseageIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });

  var logoSearchIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoSearchIcon.className = "fa-solid fa-magnifying-glass"; // Clase de Font Awesome para el ícono de lupa
  logoSearchIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoSearchIcon.style.marginTop = "20px"; // Margen superior
  logoSearchIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoSearchIcon); // logoIcon es hijo de logoLink

  logoSearchIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });


  var logoLinkIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoLinkIcon.className = "fa-solid fa-link"; // Clase de Font Awesome para el ícono de brujula
  logoLinkIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoLinkIcon.style.marginTop = "20px"; // Margen superior
  logoLinkIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoLinkIcon); // logoIcon es hijo de logoLink

  logoLinkIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });

  var logoMenuIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoMenuIcon.className = "fa-solid fa-bars"; // Clase de Font Awesome para el ícono de menu
  logoMenuIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoMenuIcon.style.marginTop = "20px"; // Margen superior
  logoMenuIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoMenuIcon); // logoIcon es hijo de logoLink

  logoMenuIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });

  var logoUserIcon = document.createElement("i"); // Crear un elemento i para el ícono de Font Awesome
  logoUserIcon.className = "fa-solid fa-user"; // Clase de Font Awesome para el ícono de menu
  logoUserIcon.style.fontSize = "50px"; // Tamaño de la fuente
  logoUserIcon.style.marginTop = "20px"; // Margen superior
  logoUserIcon.style.color = "#00d4ff"; // Color del texto
  sidebar.appendChild(logoUserIcon); // logoIcon es hijo de logoLink

  logoUserIcon.addEventListener("click", function () {
    //  Eliminar el formulario de registro
    //  Mostrar la sección 1
    container.removeChild(home.container);
    container.appendChild(login.container);
  });

  //============================================= Crear contenedor para las historias===========================================S3


  var navbar = document.createElement("div");
  navbar.style.gridArea = 'navbar'
  navbar.style.display = "flex";
  navbar.style.flexDirection = "row";
  navbar.style.alignItems = "center";
  navbar.style.justifyContent = "center";
  navbar.style.backgroundColor = "#1a1a1a"; // Fondo de la página
  navbar.style.width = "100%";
  navbar.style.height = "50px";
  //navbar.style.borderBottom = "2px solid #00d4ff"; // Borde azul claro futurista
  navbar.style.marginTop = "20px";
  this.container.appendChild(navbar); // navbar es hijo de container


  for(i = 0 ; i < 12 ; i++){
    var historyIcon= document.createElement('div')
    historyIcon.style.height = '30px'
    historyIcon.style.width = '30px'
    historyIcon.style.backgroundColor = '#00d4ff'
    historyIcon.style.border = '2px solid #00d4ff'
    historyIcon.style.borderRadius = '50%'
    historyIcon.style.margin = '10px'
    navbar.appendChild(historyIcon)




  }

  //=================================CREO CONTENEDOR DE MIS CARDS============================================================================S3

  var boxCards = document.createElement("div");
  boxCards.style.gridArea = 'main'
  boxCards.style.display = "flex";
  boxCards.style.flexDirection = "column"; // Las cards se colocan en columna
  boxCards.style.justifyContent = "space-between"; // Espacio entre las cards
  boxCards.style.width = "100%"; // Ocupa todo el ancho del contenedor
  boxCards.style.flexWrap = "wrap"; // Las cards se colocan en la siguiente línea si no entran en el ancho
  boxCards.style.marginTop = "20px";
  this.container.appendChild(boxCards); //boxCard es el hijo de section

  // Crear y agregar las cards

  var card = document.createElement("article");
  card.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
  card.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
  card.style.color = "#00d4ff"; // Texto azul claro futurista
  card.style.margin = "10px";
  card.style.padding = "100px";
  //card.style.flex = "1"; // Cada card ocupa el mismo espacio
  card.style.textAlign = "center";
  boxCards.appendChild(card); // card es hijo de boxCards
  
  var card2 = document.createElement("article");
  card2.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
  card2.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
  card2.style.color = "#00d4ff"; // Texto azul claro futurista
  card2.style.margin = "10px";
  card2.style.padding = "100px";
  //card2.style.flex = "1"; // Cada card ocupa el mismo espacio
  card2.style.textAlign = "center";
  boxCards.appendChild(card2); // card es hijo de boxCards

  var card3 = document.createElement("article");
  card3.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
  card3.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
  card3.style.color = "#00d4ff"; // Texto azul claro futurista
  card3.style.margin = "10px";
  card3.style.padding = "100px";
  //card3.style.flex = "1"; // Cada card ocupa el mismo espacio
  card3.style.textAlign = "center";
  boxCards.appendChild(card3); // card es hijo de boxCards


  var card4 = document.createElement("article");
  card4.style.border = "2px solid #00d4ff"; // Borde azul claro futurista
  card4.style.backgroundColor = "#1a1a1a"; // Fondo oscuro
  card4.style.color = "#00d4ff"; // Texto azul claro futurista
  card4.style.margin = "10px";
  card4.style.padding = "100px";
  //card4.style.flex = "1"; // Cada card ocupa el mismo espacio
  card4.style.textAlign = "center";
  boxCards.appendChild(card4); // card es hijo de boxCard4

  var toolscard= document.createElement('div')
  toolscard.textContent = 'iconos'
  card.appendChild(toolscard)
}),


login.mount();
register.mount();
home.mount();
