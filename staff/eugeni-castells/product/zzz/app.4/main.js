console.clear();

document.body.style.margin = "0";
//data

var loginFormData = {
  username: "",
  password: "",
};

var registerFormData = {
  name: "",
  email: "",
  username: "",
  password: "",
};

var users = [];
users = JSON.parse(localStorage.getItem("users"));

//object

function Component(tag) {
  this.container = document.createElement(tag);
  this.add = function (child) {
    this.container.appendChild(child.container);
  };

  this.handleClick = function (itemToRemove, itemToShow) {
    this.container.addEventListener(
      "click",
      function () {
        document.body.removeChild(itemToRemove.container);
        document.body.appendChild(itemToShow.container);
      }.bind(this)
    );
  };
}

function Div() {
  Component.call(this, "div");
}

Div.prototype = Object.create(Component.prototype);
Div.prototype.constructor = Div;
function TextComponent(type, textContent) {
  Component.call(this, type);

  this.container.textContent = textContent;
}

TextComponent.prototype = Object.create(Component.prototype);
TextComponent.prototype.constructor = TextComponent;

function Header(level, text) {
  TextComponent.call(this, `h${level}`, text);
}

Header.prototype = Object.create(TextComponent.prototype); //Copia el prototype de Component, no el contingut de component.
// Header.constructor
Header.prototype.constructor = Header;

function Anchor(text) {
  TextComponent.call(this, "a", text);
}

Anchor.prototype = Object.create(TextComponent.prototype);
Anchor.prototype.constructor = Anchor;

function Span(text) {
  TextComponent.call(this, "span", text);
}

Span.prototype = Object.create(TextComponent.prototype);
Span.prototype.constructor = Span;

function Form() {
  Component.call(this, "form");
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

function Input(type) {
  Component.call(this, "input");
  this.container.type = type;
}

Input.prototype = Object.create(Component.prototype);
Input.prototype.constructor = Input;

function Label(text) {
  TextComponent.call(this, "label", text);
}

Label.prototype = Object.create(TextComponent.prototype);
Label.prototype.constructor = Label;

function Button(text) {
  TextComponent.call(this, "button", text);
  this.textContent = text;
}

Button.prototype = Object.create(TextComponent.prototype);
Button.prototype.constructor = Button;

Button.prototype.setType = function (type) {
  this.container.type = type;
};
// landing
var landing = new Div();

landing.mount = function () {
  document.body.appendChild(this.container);
  this.container.style.height = "100vh";
  this.container.style.padding = "2rem";

  var logo = new Header("1", "Logo");
  landing.add(logo);

  //var register or login div
  var linkDiv = new Div();
  landing.add(linkDiv);

  //var link Register
  var registerLink = new Anchor("Register");
  linkDiv.add(registerLink);
  landing.handleClick(landing, register);

  //or text
  var orText = new Span(" or ");
  linkDiv.add(orText);

  //var link Login
  var loginLink = new Anchor("Login");
  loginLink.handleClick(landing, login);
  linkDiv.add(loginLink);
};

// register

var register = new Div();
register.mount = function () {
  this.container.style.height = "100vh";
  this.container.style.padding = "2rem";

  //logo
  var logo = new Header("1", "Logo");
  this.add(logo);

  //form
  var form = new Form();
  form.container.style.display = "flex";
  form.container.style.flexDirection = "column";
  form.container.style.gap = "1rem";

  form.container.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      var registerPassed = true;
      for (var property in registerFormData) {
        if (registerFormData[property] === "") {
          registerPassed = false;
          break;
        }
      }

      if (registerPassed) {
        users[users.length] = registerFormData;
        localStorage.setItem("users", JSON.stringify(users));
        document.body.removeChild(this.container);
        document.body.appendChild(login.container);
      } else alert("Register failed");
    }.bind(this)
  );

  this.add(form);

  //form namefield
  var nameField = new Div();
  nameField.container.style.display = "flex";
  nameField.container.style.flexDirection = "column";
  nameField.container.style.gap = "5px";
  form.add(nameField);

  //nameInputRegister
  var nameLabel = new Label("Name");
  nameField.add(nameLabel);

  var nameInput = new Input("text");
  nameInput.container.addEventListener("keydown", function (event) {
    registerFormData.name = event.target.value;
  });

  nameField.add(nameInput);

  //form emailField
  var emailField = new Div();
  emailField.container.style.display = "flex";
  emailField.container.style.flexDirection = "column";
  emailField.container.style.gap = "5px";

  form.add(emailField);

  //emailInputRegister
  var emailLabel = new Label("E-mail");
  emailField.add(emailLabel);

  var emailInput = new Input("text");
  emailInput.container.addEventListener("keydown", function (event) {
    registerFormData.email = event.target.value;
  });

  emailField.add(emailInput);

  //form usernameField
  var usernameField = new Div();
  usernameField.container.style.display = "flex";
  usernameField.container.style.flexDirection = "column";
  usernameField.container.style.gap = "5px";
  form.add(usernameField);

  //usernameInputRegister
  var usernameLabel = new Label("Username");
  usernameField.add(usernameLabel);

  var usernameInput = new Input("text");
  usernameField.add(usernameInput);

  usernameInput.container.addEventListener("keydown", function (event) {
    registerFormData.username = event.target.value;
  });
  //form passwordField
  var passwordField = new Div();
  passwordField.container.style.display = "flex";
  passwordField.container.style.flexDirection = "column";
  passwordField.container.style.gap = "5px";
  form.add(passwordField);

  //passwordInputRegister
  var passwordLabel = new Label("Password");
  passwordField.add(passwordLabel);

  var passwordInput = new Input("password");
  passwordField.add(passwordInput);

  passwordInput.container.addEventListener("keydown", function (event) {
    registerFormData.password = event.target.value;
  });

  //button wrapper
  var buttonWrapper = new Div();
  form.add(buttonWrapper);
  buttonWrapper.container.style.display = "flex";
  buttonWrapper.container.style.justifyContent = "space-between";

  //login
  var loginButton = new Button("Login");
  loginButton.container.style.width = "auto";
  loginButton.container.style.padding = "5px";
  buttonWrapper.add(loginButton);

  loginButton.container.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(login.container);
    }.bind(this)
  );

  //register button
  var registerFormButton = new Button("Register");
  registerFormButton.type = "submit";
  buttonWrapper.add(registerFormButton);
  registerFormButton.container.style.width = "65px";
  registerFormButton.container.style.backgroundColor = "black";
  registerFormButton.container.style.color = "white";
  registerFormButton.container.style.padding = "5px";
};

// login
var login = new Div();

login.mount = function () {
  this.container.style.height = "100vh";
  this.container.style.padding = "2rem";

  //loginLogo
  var logo = new Header("1", "Logo");
  this.add(logo);

  //loginForm
  var form = new Form();
  form.container.style.display = "flex";
  form.container.style.flexDirection = "column";
  form.container.style.gap = "1rem";
  this.add(form);

  //form namefield
  var nameField = new Div();
  nameField.container.style.display = "flex";
  nameField.container.style.flexDirection = "column";
  nameField.container.style.gap = "5px";
  form.add(nameField);

  //usernameInputLogin
  var nameLabel = new Label("Username");
  nameField.add(nameLabel);

  var nameInput = new Input("text");

  nameInput.container.addEventListener("keydown", function (event) {
    loginFormData.username = event.target.value;
  });

  nameField.add(nameInput);

  //form passwordField
  var passwordField = new Div();
  passwordField.container.style.display = "flex";
  passwordField.container.style.flexDirection = "column";
  passwordField.container.style.gap = "5px";
  form.add(passwordField);

  //username password Login
  var passwordLabel = new Label("Password");
  passwordField.add(passwordLabel);

  var passwordInput = new Input("password");
  passwordInput.container.addEventListener("keydown", function (event) {
    loginFormData.password = event.target.value;
  });
  passwordField.add(passwordInput);

  var buttonWrapper = new Div();
  buttonWrapper.container.style.display = "flex";
  buttonWrapper.container.style.justifyContent = "space-between";
  form.add(buttonWrapper);

  //register button
  var registerButton = new Button("Register");
  buttonWrapper.add(registerButton);
  registerButton.container.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(register.container);
    }.bind(this)
  );

  //login button
  var formButton = new Button("Login");
  formButton.setType("submit");
  buttonWrapper.add(formButton);
  formButton.container.style.width = "50px";
  formButton.container.style.backgroundColor = "black";
  formButton.container.style.color = "white";
  formButton.container.style.padding = "5px";
  formButton.container.style.alignSelf = "flex-end";
  formButton.container.addEventListener(
    "click",
    function (event) {
      event.preventDefault();

      var correctUsername = false;

      var correctPassword = false;

      for (var i = 0; i < users.length; i++) {
        if (loginFormData.username === users[i].username) {
          correctUsername = true;
        }

        if (loginFormData.password === users[i].password) {
          correctPassword = true;
        }
      }
      if (correctPassword && correctPassword) {
        alert("Login successful!");
        document.body.removeChild(this.container);
        document.body.appendChild(home.container);
      } else {
        alert("Login failed!");
      }
    }.bind(this)
  );
};

// home

var home = new Div();

home.mount = function () {
  this.container.style.padding = "1rem";
  var logo = new Header("1", "Logo");
  logo.container.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(landing.container);
    }.bind(this)
  );
  this.add(logo);

  var sectionWrapper = new Div();
  sectionWrapper.container.style.width = "calc(100vw - 2rem)";
  sectionWrapper.container.style.height = "150px";
  sectionWrapper.container.style.backgroundColor = "gray";

  this.add(sectionWrapper);
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
