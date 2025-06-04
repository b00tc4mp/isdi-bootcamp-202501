console.clear();

//data

// landing

var landing = document.createElement("div");
document.body.appendChild(landing);
landing.style.height = "100vh";
landing.style.padding = "2rem";

var landingLogo = document.createElement("h1");
landingLogo.innerHTML = "Logo";
landing.appendChild(landingLogo);

//var register or login div
var landingLinkDiv = document.createElement("div");
landing.appendChild(landingLinkDiv);

//var link Register
var registerLink = document.createElement("a");
registerLink.href = "#register";
registerLink.innerHTML = "Register";
landingLinkDiv.appendChild(registerLink);

//or text
var orText = document.createElement("span");
orText.innerHTML = " or ";
orText.className = "landingLinkDivText";
landingLinkDiv.appendChild(orText);

//var link Login
var loginLink = document.createElement("a");
loginLink.innerHTML = "Login";
loginLink.href = "#login";

landingLinkDiv.appendChild(loginLink);

// register

var register = document.createElement("div");
register.id = "register";

document.body.appendChild(register);
register.style.height = "100vh";
register.style.padding = "2rem";

//logo
var registerLogo = document.createElement("h1");
registerLogo.innerText = "Logo";
register.appendChild(registerLogo);

//form
var registerForm = document.createElement("form");
registerForm.style.display = "flex";
registerForm.style.flexDirection = "column";
registerForm.style.gap = "1rem";
register.appendChild(registerForm);

//form namefield
var nameFieldRegister = document.createElement("div");
nameFieldRegister.style.display = "flex";
nameFieldRegister.style.flexDirection = "column";
nameFieldRegister.style.gap = "5px";
registerForm.appendChild(nameFieldRegister);

//nameInputRegister
var nameLabel = document.createElement("label");
nameLabel.htmlFor = "name";
nameLabel.innerHTML = "Name";
nameFieldRegister.appendChild(nameLabel);

var nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.id = "name";
nameFieldRegister.appendChild(nameInput);

//form emailField
var emailFieldRegister = document.createElement("div");
emailFieldRegister.style.display = "flex";
emailFieldRegister.style.flexDirection = "column";
emailFieldRegister.style.gap = "5px";
registerForm.appendChild(emailFieldRegister);

//emailInputRegister
var emailLabel = document.createElement("label");
emailLabel.htmlFor = "email";
emailLabel.innerHTML = "E-mail";
emailFieldRegister.appendChild(emailLabel);

var emailInput = document.createElement("input");
emailInput.type = "text";
emailInput.id = "name";
emailFieldRegister.appendChild(emailInput);

//form usernameField
var usernameFieldRegister = document.createElement("div");
usernameFieldRegister.style.display = "flex";
usernameFieldRegister.style.flexDirection = "column";
usernameFieldRegister.style.gap = "5px";
registerForm.appendChild(usernameFieldRegister);

//usernameInputRegister
var usernameLabel = document.createElement("label");
usernameLabel.htmlFor = "username";
usernameLabel.innerHTML = "Username";
usernameFieldRegister.appendChild(usernameLabel);

var usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.id = "name";
usernameFieldRegister.appendChild(usernameInput);

//form passwordField
var passwordFieldRegister = document.createElement("div");
passwordFieldRegister.style.display = "flex";
passwordFieldRegister.style.flexDirection = "column";
passwordFieldRegister.style.gap = "5px";
registerForm.appendChild(passwordFieldRegister);

//passwordInputRegister
var passwordLabel = document.createElement("label");
passwordLabel.htmlFor = "password";
passwordLabel.innerHTML = "Password";
passwordFieldRegister.appendChild(passwordLabel);

var passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordFieldRegister.appendChild(passwordInput);

//register button
var registerFormButton = document.createElement("button");
registerFormButton.innerHTML = "Register";
registerFormButton.type = "submit";
registerForm.appendChild(registerFormButton);
registerFormButton.style.width = "65px";
registerFormButton.style.backgroundColor = "black";
registerFormButton.style.color = "white";
registerFormButton.style.padding = "5px";
registerFormButton.style.alignSelf = "flex-end";

// login

var login = document.createElement("div");
login.id = "login";
document.body.appendChild(login);
login.style.height = "100vh";
login.style.padding = "2rem";

//loginLogo
var loginLogo = document.createElement("h1");
loginLogo.innerHTML = "Logo";
login.appendChild(loginLogo);

//loginForm
var loginForm = document.createElement("form");
loginForm.style.display = "flex";
loginForm.style.flexDirection = "column";
loginForm.style.gap = "1rem";
login.appendChild(loginForm);

//form namefield
var nameFieldLogin = document.createElement("div");
nameFieldLogin.style.display = "flex";
nameFieldLogin.style.flexDirection = "column";
nameFieldLogin.style.gap = "5px";
loginForm.appendChild(nameFieldLogin);

//usernameInputLogin
var loginNameLabel = document.createElement("label");
loginNameLabel.htmlFor = "username";
loginNameLabel.innerHTML = "Username";
nameFieldLogin.appendChild(loginNameLabel);

var loginNameInput = document.createElement("input");
loginNameInput.type = "text";
loginNameInput.id = "username";
nameFieldLogin.appendChild(loginNameInput);

//form passwordField
var passwordFieldLogin = document.createElement("div");
passwordFieldLogin.style.display = "flex";
passwordFieldLogin.style.flexDirection = "column";
passwordFieldLogin.style.gap = "5px";
loginForm.appendChild(passwordFieldLogin);

//emailInputRegiste
var loginPasswordLabel = document.createElement("label");
loginPasswordLabel.htmlFor = "password";
loginPasswordLabel.innerHTML = "Password";
passwordFieldLogin.appendChild(loginPasswordLabel);

var loginPasswordInput = document.createElement("input");
loginPasswordInput.type = "password";
loginPasswordInput.id = "password";
passwordFieldLogin.appendChild(loginPasswordInput);

//login button
var loginFormButton = document.createElement("button");
loginFormButton.innerHTML = "Login";
loginFormButton.type = "submit";
loginForm.appendChild(loginFormButton);
loginFormButton.style.width = "50px";
loginFormButton.style.backgroundColor = "black";
loginFormButton.style.color = "white";
loginFormButton.style.padding = "5px";
loginFormButton.style.alignSelf = "flex-end";

// home

var home = document.createElement("div");
document.body.appendChild(home);

//global styles

var styledLinks = document.getElementsByTagName("a");

for (var i = 0; i < styledLinks.length; i++) {
  console.log(styledLinks[i]);
  styledLinks[i].style.textDecoration = "underline";
  styledLinks[i].style.color = "black";
  styledLinks[i].style.fontSize = "30px";
}

var styledSpans = document.getElementsByTagName("span");

for (var i = 0; i < styledLinks.length; i++) {
  styledSpans[i].style.color = "black";
  styledSpans[i].style.fontSize = "26px";
}

// Landing
// document.body.style.color = "#428A82";
// document.body.style.backgroundColor = "#E0EEEC";
// document.body.style.fontFamily = "verdana";
// var landing = document.createElement("div");
// document.body.appendChild(landing);
// var landingLogo = document.createElement("h1");
// landing.appendChild(landingLogo);
// var landingLogoText = document.createTextNode("Logo");
// landingLogo.appendChild(landingLogoText);
// var welcome = document.createElement("h3");
// landing.appendChild(welcome);
// var welcomeText = document.createTextNode("Welcome!");
// welcome.appendChild(welcomeText);
// var loginRegisterBox = document.createElement("div");
// loginRegisterBox.style.display = "flex";
// loginRegisterBox.style.flexDirection = "column";
// loginRegisterBox.style.gap = "5px";
// landing.appendChild(loginRegisterBox);
// var loginBox = document.createElement("button");
// loginBox.textContent = "Login";
// loginBox.style.color = "#FFFFFF";
// loginBox.style.backgroundColor = "#428A82";
// loginRegisterBox.appendChild(loginBox);
// loginBox.addEventListener("click", function () {
//   document.body.removeChild(landing);
//   document.body.appendChild(login);
// });
// var registerBox = document.createElement("button");
// registerBox.textContent = "Register";
// registerBox.style.backgroundColor = "#E0EEEC";
// registerBox.style.borderColor = "#428A82";
// loginRegisterBox.appendChild(registerBox);
// registerBox.addEventListener("click", function () {
//   document.body.removeChild(landing);
//   document.body.appendChild(register);
// });
// // Register
// var register = document.createElement("div");
// //document.body.appendChild(register)
// var registerLogo = document.createElement("h1");
// register.appendChild(registerLogo);
// var registerLogoText = document.createTextNode("Logo");
// registerLogo.appendChild(registerLogoText);
// var registerForm = document.createElement("form");
// registerForm.style.display = "flex";
// registerForm.style.flexDirection = "column";
// registerForm.style.gap = "0.5rem";
// //registerForm.style.alignItems = 'center'
// register.appendChild(registerForm);
// var nameLabel = document.createElement("label");
// nameLabel.textContent = "Name: ";
// registerForm.appendChild(nameLabel);
// var nameInput = document.createElement("input");
// nameInput.type = "text";
// nameInput.name = "name";
// registerForm.appendChild(nameInput);
// var surnameLabel = document.createElement("label");
// surnameLabel.textContent = "Surname: ";
// registerForm.appendChild(surnameLabel);
// var surnameInput = document.createElement("input");
// surnameInput.type = "text";
// surnameInput.name = "surname";
// registerForm.appendChild(surnameInput);
// var emailLabel = document.createElement("label");
// emailLabel.textContent = "E-mail: ";
// registerForm.appendChild(emailLabel);
// var emailInput = document.createElement("input");
// emailInput.type = "text";
// emailInput.name = "email";
// registerForm.appendChild(emailInput);
// var usernameLabel = document.createElement("label");
// usernameLabel.textContent = "Username: ";
// registerForm.appendChild(usernameLabel);
// var usernameInput = document.createElement("input");
// usernameInput.type = "text";
// usernameInput.name = "username";
// registerForm.appendChild(usernameInput);
// var passwordLabel = document.createElement("label");
// passwordLabel.textContent = "Password: ";
// registerForm.appendChild(passwordLabel);
// var passwordInput = document.createElement("input");
// passwordInput.type = "password";
// passwordInput.name = "password";
// registerForm.appendChild(passwordInput);
// var registerSubmit = document.createElement("button");
// registerSubmit.textContent = "Register";
// registerSubmit.type = "submit";
// registerSubmit.style.backgroundColor = "#428A82";
// registerSubmit.style.color = "#FFFFFF";
// registerForm.appendChild(registerSubmit);
// var loginRegister = document.createElement("a");
// loginRegister.textContent = "Login";
// loginRegister.style.fontWeight = "bold";
// loginRegister.style.textDecoration = "underline";
// loginRegister.style.marginTop = "50px";
// loginRegister.style.textAlign = "center";
// registerForm.appendChild(loginRegister);
// loginRegister.addEventListener("click", function () {
//   document.body.removeChild(register);
//   document.body.appendChild(login);
// });
// // Login
// var login = document.createElement("div");
// //document.body.appendChild(login)
// var loginLogo = document.createElement("h1");
// loginLogo.textContent = "Logo";
// login.appendChild(loginLogo);
// var loginText = document.createElement("h3");
// loginText.textContent = "Login";
// login.appendChild(loginText);
// var loginForm = document.createElement("form");
// loginForm.style.display = "flex";
// loginForm.style.flexDirection = "column";
// loginForm.style.gap = "0.5rem";
// login.appendChild(loginForm);
// var loginNameLabel = document.createElement("label");
// loginNameLabel.textContent = "Name: ";
// loginForm.appendChild(loginNameLabel);
// var loginNameInput = document.createElement("input");
// loginNameInput.type = "text";
// loginNameInput.name = "login-name";
// loginForm.appendChild(loginNameInput);
// var loginPasswordLabel = document.createElement("label");
// loginPasswordLabel.textContent = "Password: ";
// loginForm.appendChild(loginPasswordLabel);
// var loginPasswordInput = document.createElement("input");
// loginPasswordInput.type = "password";
// loginPasswordInput.name = "password-input";
// loginForm.appendChild(loginPasswordInput);
// var loginSubmit = document.createElement("button");
// loginSubmit.textContent = "Login";
// loginSubmit.type = "submit";
// loginSubmit.style.backgroundColor = "#428A82";
// loginSubmit.style.color = "#FFFFFF";
// loginForm.appendChild(loginSubmit);
// var registerLogin = document.createElement("a");
// registerLogin.textContent = "Register";
// registerLogin.style.fontWeight = "bold";
// registerLogin.style.textDecoration = "underline";
// registerLogin.style.marginTop = "50px";
// registerLogin.style.textAlign = "center";
// loginForm.appendChild(registerLogin);
// registerLogin.addEventListener("click", function () {
//   document.body.removeChild(login);
//   document.body.appendChild(register);
// });
// // HOME
// var home = document.createElement("div");
// //document.body.appendChild(home)
// var logoHome = document.createElement("h1");
// logoHome.textContent = "Logo";
// home.appendChild(logoHome);
// var logOutHome = document.createElement("button");
// logOutHome.textContent = "Log out";
// logOutHome.style.color = "#FFFFFF";
// logOutHome.style.backgroundColor = "#428A82";
// home.appendChild(logOutHome);
// var postFrame1 = document.createElement("article");
// home.appendChild(postFrame1);
// var usernamePostFrame1 = document.createElement("p");
// usernamePostFrame1.textContent = "username1";
// postFrame1.appendChild(usernamePostFrame1);
// var photoContainer1 = document.createElement("div");
// photoContainer1.style.width = "100%"; //'440px'
// photoContainer1.style.height = "440px";
// postFrame1.appendChild(photoContainer1);
// var photoImg1 = document.createElement("img");
// photoImg1.src =
//   "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
// photoImg1.style.objectFit = "cover";
// photoImg1.style.width = "100%";
// photoImg1.style.height = "100%";
// photoContainer1.appendChild(photoImg1);
// var commentPostFrame1 = document.createElement("p");
// commentPostFrame1.textContent = "comment 1";
// postFrame1.appendChild(commentPostFrame1);
// var postFrame2 = document.createElement("article");
// home.appendChild(postFrame2);
// var usernamePostFrame2 = document.createElement("p");
// usernamePostFrame2.textContent = "username2";
// postFrame2.appendChild(usernamePostFrame2);
// var photoContainer2 = document.createElement("div");
// photoContainer2.style.width = "100%";
// photoContainer2.style.height = "440px";
// postFrame2.appendChild(photoContainer2);
// var photoImg2 = document.createElement("img");
// photoImg2.src =
//   "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg";
// photoImg2.style.objectFit = "cover";
// photoImg2.style.width = "100%";
// photoImg2.style.height = "100%";
// photoContainer2.appendChild(photoImg2);
// var commentPostFrame2 = document.createElement("p");
// commentPostFrame2.textContent = "comment 2";
// postFrame2.appendChild(commentPostFrame2);
// registerForm.addEventListener("submit", function () {
//   document.body.removeChild(register);
//   document.body.appendChild(login);
// });
// loginForm.addEventListener("submit", function () {
//   document.body.removeChild(login);
//   document.body.appendChild(home);
// });
// logOutHome.addEventListener("click", function () {
//   document.body.removeChild(home);
//   document.body.appendChild(landing);
// });
