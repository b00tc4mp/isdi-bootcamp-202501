console.clear();
console.log("Hello, App!");


function Component(tagName) {
  this.container = document.createElement(tagName);
}

Component.prototype.add = function (child) {
  this.container.appendChild(child.container);
};

//================================================CREO EL METODO REMOVE=======================================================================

Component.prototype.remove = function (child) {
  this.container.removeChild(child.container);
};
//============================================CREO EL METODO CLICK=======================================================================

Component.prototype.addClickListener = function (callback) {
  this.container.addEventListener("click", callback);
};
//============================================CREO EL METODO HOVER =======================================================================

Component.prototype.addPointerAndHoverEffects = function () {
  this.container.style.cursor = "pointer";
  this.container.addEventListener("mouseover", function () {
    this.style.backgroundColor = "#0f0d4f";
    this.style.color = "#fff";
  });
  this.container.addEventListener("mouseout", function () {
    this.style.backgroundColor = "#1a1a1a";
    this.style.color = "#fff";
  });
};

// ============================================CREO EL BODY=======================================================================
function Body() {
  Component.call(this, "body");
}

// Aqui digo que el portotipo del  body es un objeto que hereda de la clase Component y que el constructor de Body es la clase Body
// Esto me permite heredar los metodos de la clase Component
Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body;

// Crear una instancia de Body
const body = new Body();
document.body = body.container; // body.container sustitulle al body del html

//================================================CREO EL MAIN=======================================================================

function Main() {
  Component.call(this, "main");
  this.container.style.display = "flex";
  this.container.style.flexDirection = "column";
  this.container.style.alignItems = "center";
  this.container.style.backgroundColor = "#1a1a1a";
  this.container.style.width = "100vw";
  this.container.style.height = "100vh";
}
Main.prototype = Object.create(Component.prototype);
Main.prototype.constructor = Main;

var main = new Main();
body.add(main);
//===========================CREO MIS Componentes MOLECULARES=================
//TITLES COMPONENT
function Heading(level) {
  Component.call(this, "h" + level);
}
Heading.prototype = Object.create(Component.prototype);
Heading.prototype.constructor = Heading;

Heading.prototype.setText = function (text) {
  this.container.text = text;
};

//LOGO COMPONENT
function Logo() {
  Component.call(this, "div");
}
Logo.prototype = Object.create(Component.prototype);
Logo.prototype.constructor = Logo;

// INPUT COMPONENT

function Input() {
  Component.call(this, "input");
}

Input.prototype = Object.create(Component.prototype);
Input.prototype.constructor = Input;

Input.prototype.setType = function (type) {
  this.container.type = type;
};

Input.prototype.setPlaceholder = function (placeholder) {
  this.container.placeholder = placeholder;
};

Input.prototype.getValue = function () {
  return this.container.value;
};

//LINK COMPONENT
function Link() {
  Component.call(this, "a");
}

Link.prototype = Object.create(Component.prototype);
Link.prototype.constructor = Link;

Link.prototype.setText= function (text){
  this.container.text= text
}

//BUTTON COMPONENT
function Button() {
  Component.call(this, "button");
}

Button.prototype = Object.create(Component.prototype);
Button.prototype.constructor = Button;

Button.prototype.setType = function (type) {
  this.container.type = type;
};

Button.prototype.setText = function (text) {
  this.container.textContent = text;
};

//FORM COMPONENT
function Form() {
  Component.call(this, "form");
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

Form.prototype.addSubmitListener = function (callback) {
  this.container.addEventListener("submit", callback);
};

//ICON COMPONENT
function Icon() {
  Component.call(this, "i");
}

Icon.prototype = Object.create(Component.prototype);
Icon.prototype.constructor = Icon;

//SPAN COMPONENT
function Span() {
  Component.call(this, "span");
}

Span.prototype = Object.create(Component.prototype);
Span.prototype.constructor = Span;

//DIV COMPONENT
function Div() {
  Component.call(this, "div");
}

Div.prototype = Object.create(Component.prototype);
Div.prototype.constructor = Div;

function Label() {
  Component.call(this, "label");
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.create = Label;

Label.prototype.setText = function (text) {
  this.container.textContent = text;
};

//============================================CREO LAS SECTION/s  ========================================================================
/*
creo a partir de la funcion constructora Compenent un nuevo componente que es la seccion 1
y le agrego el metodo add que me permite montar el componente en el contenedor principal 'container'

*/
/*============================================CREO LA SECTION 1 ==============================================================================================================================================================================================================================================================================================================================================================================

*/
function Landing() {
  Component.call(this, "section");
  this.container.style.display = "flex";
  this.container.style.flexDirection = "column";
  this.container.style.alignItems = "center";

  //========================================== Crear contenedor para el logo=============================================================S1
  var boxLogo = new Div();
  boxLogo.container.style.display = "flex";
  boxLogo.container.style.flexDirection = "column";
  boxLogo.container.style.alignItems = "center";
  boxLogo.container.style.padding = "20px";
  boxLogo.container.style.marginTop = "20px";
  this.add(boxLogo);

  var logoLink = new Link();
  logoLink.container.href = "#";
  logoLink.container.style.fontSize = "50px";
  logoLink.container.style.color = "#00d4ff";
  boxLogo.add(logoLink);

  var logoIcon = new Icon();
  logoIcon.container.className = "fa-solid fa-user-secret"; // Clase de Font Awesome para el ícono de casa
  logoLink.add(logoIcon); // logoIcon es hijo de logoLink

  //============================================ Crear contenedor para los inputs=========================================================S1
  var boxInputs = new Div();
  boxInputs.container.style.display = "flex";
  boxInputs.container.style.flexDirection = "column";
  boxInputs.container.style.alignItems = "center";
  boxInputs.container.style.marginTop = "20px";
  this.add(boxInputs);

  var inputEmail = new Input();
  inputEmail.setType("email");
  inputEmail.setPlaceholder("Enter your email");
  inputEmail.container.style.margin = "10px";
  inputEmail.container.style.border = "2px solid #00d4ff";
  inputEmail.container.style.backgroundColor = "#1a1a1a";
  inputEmail.container.style.color = "#00d4ff";
  boxInputs.add(inputEmail);

  var inputPassword = new Input();
  inputPassword.setType("password");
  inputPassword.setPlaceholder("Enter your password");
  inputPassword.container.style.margin = "10px";
  inputPassword.container.style.border = "2px solid #00d4ff";
  inputPassword.container.style.backgroundColor = "#1a1a1a";
  inputPassword.container.style.color = "#00d4ff";
  boxInputs.add(inputPassword);

  var buttonLogin = new Button();
  buttonLogin.setType("submit");
  buttonLogin.setText("Login");
  buttonLogin.container.style.margin = "10px";
  buttonLogin.container.style.border = "2px solid #00d4ff";
  buttonLogin.container.style.backgroundColor = "#1a1a1a";
  buttonLogin.container.style.color = "#00d4ff";
  buttonLogin.container.style.transition = "background-color 0.3s, color 0.3s";
  buttonLogin.addClickListener(
    function () {
      alert("Login exitoso!");
      //  Eliminar el formulario de login
      //  Mostrar la sección 3
      main.remove(landing);
      main.add(home);
    }.bind(this)
  );
  boxInputs.add(buttonLogin);

  //========================================= Crear contenedor para REGISTER=========================================================S1
  var boxLinks = new Div();
  boxLinks.container.style.display = "flex";
  boxLinks.container.style.flexDirection = "row";
  boxLinks.container.style.alignItems = "center";
  boxLinks.container.style.marginTop = "20px";
  this.add(boxLinks);

  var loginLink = new Link();
  loginLink.setText("Register");
  loginLink.container.href = "#";
  loginLink.container.style.textDecoration = "none";
  loginLink.container.style.fontFamily = "Georgia, serif";
  loginLink.container.style.margin = "10px";
  loginLink.container.style.color = "#00d4ff";
  loginLink.container.style.transition = "color 0.3s";
  loginLink.addClickListener(
    function () {
      main.remove(landing);
      main.add(register);
    }.bind(this)
  );
  boxLinks.add(loginLink);
}
Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

var landing = new Landing();
main.add(landing);

//============================================CREO LA SECTION 2 ==============================================================================================================================================================================================================================================================================================================================================================================

function Register() {
  Component.call(this, "section");
  this.container.style.display = "flex";
  this.container.style.flexDirection = "column";
  this.container.style.alignItems = "center";

  var boxRegisterLogo = new Div();
  boxRegisterLogo.container.style.display = "flex";
  boxRegisterLogo.container.style.flexDirection = "column";
  boxRegisterLogo.container.style.alignItems = "center";
  boxRegisterLogo.container.style.padding = "20px";
  boxRegisterLogo.container.style.marginTop = "20px";
  this.add(boxRegisterLogo);

  var logoRegisterLink = new Link();
  logoRegisterLink.container.href = "#";
  logoRegisterLink.container.style.fontSize = "50px";
  logoRegisterLink.container.style.color = "#00d4ff";
  boxRegisterLogo.add(logoRegisterLink);

  var logoRegisterIcon = new Icon();
  logoRegisterIcon.container.className = "fa-solid fa-user-secret"; // Clase de Font Awesome para el ícono de casa
  logoRegisterLink.add(logoRegisterIcon); // logoIcon es hijo de logoLink

  var boxFormRegister = new Div();
  boxFormRegister.container.style.display = "flex";
  boxFormRegister.container.style.flexDirection = "column";
  boxFormRegister.container.style.alignItems = "center";
  boxFormRegister.container.style.marginTop = "20px";
  this.add(boxFormRegister);

  var form = new Form();
  form.container.style.display = "flex";
  form.container.style.flexDirection = "column";
  form.container.style.alignItems = "center";
  form.addSubmitListener(function (event) {
    event.preventDefault();

    console.log("Register Data Submit");

    var name = nameInput.getValue();
    var email = emailInput.getValue();
    var password = passwordInput.getValue();

    console.log(name, email, password);
  });
  boxFormRegister.add(form);

 

  var nameInput = new Input();
  nameInput.setType("name");
  nameInput.setPlaceholder("Name");
  nameInput.container.style.margin = "10px";
  nameInput.container.style.border = "2px solid #00d4ff";
  nameInput.container.style.backgroundColor = "#1a1a1a";
  nameInput.container.style.color = "#00d4ff";
  form.add(nameInput);

  
  var emailInput = new Input();
  emailInput.setType("email");
  emailInput.setPlaceholder("Email");
  emailInput.container.style.margin = "10px";
  emailInput.container.style.border = "2px solid #00d4ff";
  emailInput.container.style.backgroundColor = "#1a1a1a";
  emailInput.container.style.color = "#00d4ff";
  form.add(emailInput);


  var passwordInput = new Input();
  passwordInput.setType("password");
  passwordInput.setPlaceholder("Password");
  passwordInput.container.style.margin = "10px";
  passwordInput.container.style.border = "2px solid #00d4ff";
  passwordInput.container.style.backgroundColor = "#1a1a1a";
  passwordInput.container.style.color = "#00d4ff";
  form.add(passwordInput);

  var submitButton = new Button();
  submitButton.setText("Register");
  submitButton.setType("submit");
  submitButton.container.style.margin = "10px";
  submitButton.container.style.border = "2px solid #00d4ff";
  submitButton.container.style.backgroundColor = "#1a1a1a";
  submitButton.container.style.color = "#00d4ff";
  submitButton.container.style.transition = "color 0.3s";

  submitButton.addPointerAndHoverEffects();
  submitButton.addClickListener(
    function () {
      alert("Register exitoso!");
      main.remove(register);
      main.add(landing);
    }.bind(this)
  );
  form.add(submitButton);


  var loginAnchor = new Link()
  loginAnchor.setText('Login')
  loginAnchor.container.style.color = '#00d4ff'
  loginAnchor.container.style.textDecoration = 'none'
  loginAnchor.container.style.margin = '10px'
  loginAnchor.container.style.transition = 'color 0.3s'
  loginAnchor.addClickListener(function(){
    main.remove(register)
    main.add(home)
  }.bind(this))
  this.add(loginAnchor)
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

var register = new Register();


















function Home() {
  Component.call(this, "section");
  this.container.style.display = "grid";
  this.container.style.gridTemplateAreas=`
    "sidebar navbar"
    "sidebar content"
  `
  this.container.style.gridTemplateRows = 'auto 1fr'
  this.container.style.gridTemplateColumns = ' 100px auto'
  this.container.style.height = 'auto'
  this.container.style.width = '100%'



  var sidebar = new Div()
  sidebar.container.style.gridArea = 'sidebar'
  sidebar.container.style.display = 'flex'
  sidebar.container.style.flexDirection = 'column'
  sidebar.container.style.padding = '20px'
  this.add(sidebar)


  var logoHomeIcon = new Icon()
  logoHomeIcon.container.className = 'fa-solid fa-user-secret'
  logoHomeIcon.container.style.fontSize = '50px'
  logoHomeIcon.container.style.color = '#00d4ff'
  logoHomeIcon.container.style.marginBottom = '20px'
  logoHomeIcon.addClickListener(function(){
    alert('Home')
    main.remove(home)
    main.add(landing)
  }.bind(this))
  sidebar.add(logoHomeIcon)


  var logoHomeIcon = new Icon()
  logoHomeIcon.container.className = 'fa-solid fa-user-secret'
  logoHomeIcon.container.style.fontSize = '50px'
  logoHomeIcon.container.style.color = '#00d4ff'
  logoHomeIcon.container.style.marginBottom = '20px'
  sidebar.add(logoHomeIcon)

  var logoHeartIcon = new Icon()
  logoHeartIcon.container.className = 'fa-solid fa-heart'
  logoHeartIcon.container.style.fontSize = '50px'
  logoHeartIcon.container.style.color = '#00d4ff'
  logoHeartIcon.container.style.marginBottom = '20px'
  sidebar.add(logoHeartIcon)

  var logoMesseageIcon = new Icon()
  logoMesseageIcon.container.className = 'fa-solid fa-comments'
  logoMesseageIcon.container.style.fontSize = '50px'
  logoMesseageIcon.container.style.color = '#00d4ff'
  logoMesseageIcon.container.style.marginBottom = '20px'
  sidebar.add(logoMesseageIcon)

  var logoSearchIcon = new Icon()
  logoSearchIcon.container.className = 'fa-solid fa-magnifying-glass'
  logoSearchIcon.container.style.fontSize = '50px'
  logoSearchIcon.container.style.color = '#00d4ff'
  logoSearchIcon.container.style.marginBottom = '20px'
  sidebar.add(logoSearchIcon)

  var logoLinkIcon = new Icon()
  logoLinkIcon.container.className = 'fa-solid fa-link'
  logoLinkIcon.container.style.fontSize = '50px'
  logoLinkIcon.container.style.color = '#00d4ff'
  logoLinkIcon.container.style.marginBottom = '20px'
  sidebar.add(logoLinkIcon)

  var logoMenuIcon = new Icon()
  logoMenuIcon.container.className = 'fa-solid fa-bars'
  logoMenuIcon.container.style.fontSize = '50px'
  logoMenuIcon.container.style.color = '#00d4ff'
  logoMenuIcon.container.style.marginBottom = '20px'
  sidebar.add(logoMenuIcon)

  var logoSettingsIcon = new Icon()
  logoSettingsIcon.container.className = 'fa-solid fa-cog'
  logoSettingsIcon.container.style.fontSize = '50px'
  logoSettingsIcon.container.style.color = '#00d4ff'
  logoSettingsIcon.container.style.marginBottom = '20px'
  sidebar.add(logoSettingsIcon)

  
  var navbar = new Div()
  navbar.container.style.gridArea = 'navbar'
  navbar.container.style.display = 'flex'
  navbar.container.style.justifyContent = 'space-between'
  navbar.container.style.alignItems = 'center'
  navbar.container.style.padding = '20px'
  navbar.container.style.flexDirection = 'row'
  navbar.container.style.backgroundColor = '#1a1a1a'
  navbar.container.style.width= '100%'
  navbar.container.style.height = '50px'
  navbar.container.style.marginTop = '20px'
  this.add(navbar)

  for(i  = 0 ; i < 12 ; i++){
    var navbarIcon = new Icon()
    navbarIcon.container.className = 'fa-solid fa-user'
    navbarIcon.container.style.fontSize = '20px'
    navbarIcon.container.style.color = '#00d4ff'
    navbar.add(navbarIcon)
  }


  var content = new Div()
  content.container.style.gridArea = 'content'
  content.container.style.display = 'flex'
  content.container.style.justifyContent = 'space-between'
  content.container.style.alignItems = 'center'
  content.container.style.padding = '20px'
  content.container.style.flexDirection = 'column'
  content.container.style.backgroundColor = '#1a1a1a'
  content.container.style.width= '100%'
  content.container.style.height = '100%'
  content.container.style.marginTop = '20px'
  this.add(content)

  var contentTitle = new Heading(1)
  contentTitle.setText('Home')
  content.add(contentTitle)

  var contentText = new Span()
  contentText.container.textContent = 'Bienvenido a la sección de Home'
  content.add(contentText)


  
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

var home = new Home()