console.clear();

//data

var fakeUser = {
  username: "castells",
  password: "hunterxhunter",
};

var loginFormData = {
  username: "",
  password: "",
};
//object

function Component(container) {
  this.container = container;
}

function inputHandler() {}
// function Form(...input) {
//   this.form = document.createElement("form");
//   for (var i = 0; i < input.length; i++) {
//     this.input = document.createElement("input");
//     this.form.appendChild(this.input);
//   }
// }

// landing
var landing = new Component(document.createElement("div"));

landing.mount = function () {
  document.body.appendChild(this.container);
  this.container.style.height = "100vh";
  this.container.style.padding = "2rem";

  var logo = document.createElement("h1");
  logo.textContent = "Logo";
  this.container.appendChild(logo);

  //var register or login div
  var linkDiv = document.createElement("div");
  this.container.appendChild(linkDiv);

  //var link Register
  var registerLink = document.createElement("a");
  registerLink.href = "#register";
  registerLink.textContent = "Register";
  linkDiv.appendChild(registerLink);

  registerLink.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(register.container);
    }.bind(this)
  );

  //or text
  var orText = document.createElement("span");
  orText.textContent = " or ";
  linkDiv.appendChild(orText);

  //var link Login
  var loginLink = document.createElement("a");
  loginLink.textContent = "Login";
  loginLink.href = "#login";
  loginLink.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(login.container);
    }.bind(this)
  );

  linkDiv.appendChild(loginLink);
};

// register

var register = new Component(document.createElement("div"));
register.mount = function () {
  this.container.style.height = "100vh";
  this.container.style.padding = "2rem";

  //logo
  var logo = document.createElement("h1");
  logo.innerText = "Logo";
  this.container.appendChild(logo);

  //form
  var form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "1rem";
  this.container.appendChild(form);

  //form namefield
  var nameFieldRegister = document.createElement("div");
  nameFieldRegister.style.display = "flex";
  nameFieldRegister.style.flexDirection = "column";
  nameFieldRegister.style.gap = "5px";
  form.appendChild(nameFieldRegister);

  //nameInputRegister
  var nameLabel = document.createElement("label");
  nameLabel.htmlFor = "name";
  nameLabel.textContent = "Name";
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
  form.appendChild(emailFieldRegister);

  //emailInputRegister
  var emailLabel = document.createElement("label");
  emailLabel.htmlFor = "email";
  emailLabel.textContent = "E-mail";
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
  form.appendChild(usernameFieldRegister);

  //usernameInputRegister
  var usernameLabel = document.createElement("label");
  usernameLabel.htmlFor = "username";
  usernameLabel.textContent = "Username";
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
  form.appendChild(passwordFieldRegister);

  //passwordInputRegister
  var passwordLabel = document.createElement("label");
  passwordLabel.htmlFor = "password";
  passwordLabel.textContent = "Password";
  passwordFieldRegister.appendChild(passwordLabel);

  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordFieldRegister.appendChild(passwordInput);

  //button wrapper
  var buttonWrapper = document.createElement("div");
  form.appendChild(buttonWrapper);
  buttonWrapper.style.display = "flex";
  buttonWrapper.style.justifyContent = "space-between";

  //login
  var loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.type = "button";
  loginButton.style.width = "auto";
  loginButton.style.padding = "5px";
  buttonWrapper.appendChild(loginButton);

  loginButton.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(login.container);
    }.bind(this)
  );

  //register button
  var registerFormButton = document.createElement("button");
  registerFormButton.textContent = "Register";
  registerFormButton.type = "submit";
  buttonWrapper.appendChild(registerFormButton);
  registerFormButton.style.width = "65px";
  registerFormButton.style.backgroundColor = "black";
  registerFormButton.style.color = "white";
  registerFormButton.style.padding = "5px";
};

// login
var login = new Component(document.createElement("div"));

login.mount = function () {
  this.container.id = "login";
  this.container.style.height = "100vh";
  this.container.style.padding = "2rem";

  //loginLogo
  var logo = document.createElement("h1");
  logo.textContent = "Logo";
  this.container.appendChild(logo);

  //loginForm
  var form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "1rem";
  this.container.appendChild(form);

  //form namefield
  var nameField = document.createElement("div");
  nameField.style.display = "flex";
  nameField.style.flexDirection = "column";
  nameField.style.gap = "5px";
  form.appendChild(nameField);

  //usernameInputLogin
  var nameLabel = document.createElement("label");
  nameLabel.htmlFor = "username";
  nameLabel.textContent = "Username";
  nameField.appendChild(nameLabel);

  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "username";
  nameInput.addEventListener("keyup", function (event) {
    loginFormData.username = event.target.value;
  });
  nameField.appendChild(nameInput);

  //form passwordField
  var passwordField = document.createElement("div");
  passwordField.style.display = "flex";
  passwordField.style.flexDirection = "column";
  passwordField.style.gap = "5px";
  form.appendChild(passwordField);

  //username password Login
  var passwordLabel = document.createElement("label");
  passwordLabel.htmlFor = "password";
  passwordLabel.textContent = "Password";
  passwordField.appendChild(passwordLabel);

  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.addEventListener("keyup", function (event) {
    loginFormData.password = event.target.value;
  });
  passwordField.appendChild(passwordInput);

  var buttonWrapper = document.createElement("div");
  buttonWrapper.style.display = "flex";
  buttonWrapper.style.justifyContent = "space-between";
  form.appendChild(buttonWrapper);

  //register button
  var registerButton = document.createElement("button");
  registerButton.textContent = "Register";
  registerButton.type = "submit";
  buttonWrapper.appendChild(registerButton);
  registerButton.addEventListener("click", function () {
    document.body.removeChild(container);
    document.body.appendChild(register.container);
  });

  //login button
  var formButton = document.createElement("button");
  formButton.textContent = "Login";
  formButton.type = "submit";
  buttonWrapper.appendChild(formButton);
  formButton.style.width = "50px";
  formButton.style.backgroundColor = "black";
  formButton.style.color = "white";
  formButton.style.padding = "5px";
  formButton.style.alignSelf = "flex-end";
  formButton.addEventListener(
    "click",
    function () {
      console.log(
        `Username introduced: ${loginFormData.username}`,
        `Password introduced: ${loginFormData.password}`
      );
      if (
        loginFormData.username === fakeUser.username &&
        loginFormData.password === fakeUser.password
      ) {
        alert("Login successful!");
        document.body.removeChild(this.container);
        document.body.appendChild(home.container);
      } else alert("Login failed!");
    }.bind(this)
  );
};

// home

var home = new Component(document.createElement("div"));
home.mount = function () {
  var logo = document.createElement("h1");
  logo.textContent = "Logo";
  this.container.appendChild(logo);
};

landing.mount();
register.mount();
login.mount();
home.mount();
//global styles
var styledLinks = document.getElementsByTagName("a");

for (var i = 0; i < styledLinks.length; i++) {
  console.log(styledLinks[i]);
  styledLinks[i].style.textDecoration = "underline";
  styledLinks[i].style.color = "black";
  styledLinks[i].style.fontSize = "30px";
}

var styledSpans = document.getElementsByTagName("span");

for (var i = 0; i < styledSpans.length; i++) {
  styledSpans[i].style.color = "black";
  styledSpans[i].style.fontSize = "26px";
}
