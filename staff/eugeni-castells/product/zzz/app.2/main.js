console.clear();

//object

function Container(container) {
  this.container = container;
}

// landing
var landing = {
  mount: function () {
    var container = document.createElement("div");
    landing.container = container;
    document.body.appendChild(container);
    container.style.height = "100vh";
    container.style.padding = "2rem";

    var logo = document.createElement("h1");
    logo.textContent = "Logo";
    container.appendChild(logo);

    //var register or login div
    var linkDiv = document.createElement("div");
    container.appendChild(linkDiv);

    //var link Register
    var registerLink = document.createElement("a");
    registerLink.href = "#register";
    registerLink.textContent = "Register";
    linkDiv.appendChild(registerLink);

    registerLink.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(register.container);
    });

    //or text
    var orText = document.createElement("span");
    orText.textContent = " or ";
    linkDiv.appendChild(orText);

    //var link Login
    var loginLink = document.createElement("a");
    loginLink.textContent = "Login";
    loginLink.href = "#login";

    linkDiv.appendChild(loginLink);
  },
};

// register

var register = {
  mount: function () {
    var container = document.createElement("div");
    register.container = container;
    container.id = "register";

    container.style.height = "100vh";
    container.style.padding = "2rem";

    //logo
    var logo = document.createElement("h1");
    logo.innerText = "Logo";
    container.appendChild(logo);

    //form
    var form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    container.appendChild(form);

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

    loginButton.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(login.container);
    });

    //register button
    var registerFormButton = document.createElement("button");
    registerFormButton.textContent = "Register";
    registerFormButton.type = "submit";
    buttonWrapper.appendChild(registerFormButton);
    registerFormButton.style.width = "65px";
    registerFormButton.style.backgroundColor = "black";
    registerFormButton.style.color = "white";
    registerFormButton.style.padding = "5px";
  },
};

// login
var login = {
  mount: function () {
    var container = document.createElement("div");
    login.container = container;
    container.id = "login";
    container.style.height = "100vh";
    container.style.padding = "2rem";

    //loginLogo
    var logo = document.createElement("h1");
    logo.textContent = "Logo";
    container.appendChild(logo);

    //loginForm
    var form = document.createElement("form");
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "1rem";
    container.appendChild(form);

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
    nameField.appendChild(nameInput);

    //form passwordField
    var passwordField = document.createElement("div");
    passwordField.style.display = "flex";
    passwordField.style.flexDirection = "column";
    passwordField.style.gap = "5px";
    form.appendChild(passwordField);

    //emailInputRegiste
    var passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "password";
    passwordLabel.textContent = "Password";
    passwordField.appendChild(passwordLabel);

    var passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
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
  },
};

// home

var home = {
  mount: function () {
    var container = document.createElement("div");
    home.container = container;
  },
};

landing.mount();
register.mount();
login.mount();

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
