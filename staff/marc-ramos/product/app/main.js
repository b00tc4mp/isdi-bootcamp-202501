console.clear();

// pagina landing donde vamos a ver el logo h1, un link (register), un texto (or) y otro link (login)

//LANDING

var landing = document.createElement("div"); //creo la pagina landing con el div
document.body.appendChild(landing);

var landingLogo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
landing.appendChild(landingLogo);

var landingLogoText = document.createTextNode("Landing"); //ponemos nombre al h1
landingLogo.appendChild(landingLogoText);

var landingRegisterAnchor = document.createElement("a"); //creamos una anchor (hipervinculos)
landing.appendChild(landingRegisterAnchor);

landingRegisterAnchor.addEventListener("click", function () {
  document.body.removeChild(landing);
  document.body.appendChild(register);
});

var landingRegisterAnchorText = document.createTextNode("Register"); //le ponemos texto al hipervinculo
landingRegisterAnchor.appendChild(landingRegisterAnchorText);

var landingOrText = document.createTextNode(" or "); //le ponemos texto el parrafo
landing.appendChild(landingOrText);

var landingLoginAnchor = document.createElement("a"); //creamos una anchor (hipervinculos)
landing.appendChild(landingLoginAnchor);

landingLoginAnchor.addEventListener("click", function () {
  document.body.removeChild(landing);
  document.body.appendChild(login);
});

var landingLoginAnchorText = document.createTextNode("Login"); //ponemos texto al hipervinculo
landingLoginAnchor.appendChild(landingLoginAnchorText);

// pagina register con el logo h1, un texto name y abajo un input, un texto email y abajo un input, un texto username y abajo un input, un texto password y abajo un input;
// tambien un link (login) y un botón (register)

// REGISTER

var register = document.createElement("div");
//document.body.appendChild(register);

var registerLogo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
register.appendChild(registerLogo);

var registerLogoText = document.createTextNode("Register"); //ponemos nombre al h1
registerLogo.appendChild(registerLogoText);

//input name

var registerForm = document.createElement("form"); //form para meter elementos dentro
register.appendChild(registerForm);
registerForm.style.display = "flex";
registerForm.style.flexDirection = "column";
registerForm.style.gap = "15px";

var registerFormNameLabel = document.createElement("label");
registerForm.appendChild(registerFormNameLabel);

var registerFormNameLabelText = document.createTextNode("Name");
registerFormNameLabel.appendChild(registerFormNameLabelText);

var inputUsername = document.createElement("input");
registerForm.appendChild(inputUsername);

//input e-mail

var registerFormNameLabel = document.createElement("label");
registerForm.appendChild(registerFormNameLabel);

var registerFormNameLabelText = document.createTextNode("E-mail");
registerFormNameLabel.appendChild(registerFormNameLabelText);

var inputEmail = document.createElement("input");
registerForm.appendChild(inputEmail);

// input Username

var registerFormNameLabel = document.createElement("label");
registerForm.appendChild(registerFormNameLabel);

var registerFormNameLabelText = document.createTextNode("Username");
registerFormNameLabel.appendChild(registerFormNameLabelText);

var inputUsername = document.createElement("input");
registerForm.appendChild(inputUsername);

//input password

var registerFormNameLabel = document.createElement("label");
registerForm.appendChild(registerFormNameLabel);

var registerFormNameLabelText = document.createTextNode("Password");
registerFormNameLabel.appendChild(registerFormNameLabelText);

var inputPassword = document.createElement("input");
registerForm.appendChild(inputPassword);

//hipervinculo login

var registerLoginAnchor = document.createElement("button"); //creamos una anchor (hipervinculos)
register.appendChild(registerLoginAnchor);

registerLoginAnchor.addEventListener("click", function () {
  document.body.removeChild(register);
  document.body.appendChild(login);
});

var registerLoginAnchorText = document.createTextNode("Login"); //ponemos texto al hipervinculo
registerLoginAnchor.appendChild(registerLoginAnchorText);

// WIP boton de register al lado

// LOGIN

var login = document.createElement("div");
//document.body.appendChild(login);
login.style.display = "flex";
login.style.flexDirection = "column";
login.style.gap = "15px";

var loginLogo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
login.appendChild(loginLogo);

var loginLogoText = document.createTextNode("Login"); //ponemos nombre al h1
loginLogo.appendChild(loginLogoText);

var registerForm = document.createElement("form"); //form para meter elementos dentro
registerForm.style.display = "flex";
registerForm.style.flexDirection = "column";
registerForm.style.gap = "15px";
login.appendChild(registerForm);

// input Username
var loginFormNameLabel = document.createElement("label");
registerForm.appendChild(loginFormNameLabel);

var loginFormNameLabelText = document.createTextNode("Username");
loginFormNameLabel.appendChild(loginFormNameLabelText);

var inputUsername = document.createElement("input");
inputUsername.style.width = "200px";
registerForm.appendChild(inputUsername);

// input Password
var loginFormNameLabel = document.createElement("label");
registerForm.appendChild(loginFormNameLabel);

var loginFormNameLabelText = document.createTextNode("Password");
loginFormNameLabel.appendChild(loginFormNameLabelText);

var inputPassword = document.createElement("input");
inputPassword.style.width = "200px";
registerForm.appendChild(inputPassword);

//boton enter

var buttonToHomeAnchor = document.createElement("button"); //creamos una anchor (hipervinculos)
login.appendChild(buttonToHomeAnchor);

buttonToHomeAnchor.addEventListener("click", function () {
  document.body.removeChild(login);
  document.body.appendChild(home);
});

//var buttonToHomeText = document.createTextNode("Enter"); //ponemos texto al hipervinculo
//buttonToHomeAnchor.appendChild(buttonToHomeText);

buttonToHomeAnchor.innerHTML = "Enter";

//home

var home = document.createElement("div");
//document.appendChild(home);

//logo home

var homeLogo = document.createElement("h1");
home.appendChild(homeLogo);

var homeLogoText = document.createTextNode("Home");
homeLogo.appendChild(homeLogoText);

//Boton de logout

var buttonLogout = document.createElement("button");
