//console.clear();

function Component(tagName) {
  //creamos la función constructora Component para ir creando diversas funciones
  this.container = document.createElement(tagName);
}

Component.prototype.add = function (child) {
  //creamos una funcion para crear appendChild
  this.container.appendChild(child.container)
};

Component.prototype.remove = function (child) {
  this.container.removeChild(child.container);
};

Component.prototype.addClickListener = function (callback) {
  //creamos listener
  this.container.addEventListener("click", callback);
};

function Div() {
  //creamos funcion que crea div's
  Component.call(this, "div");
}

Div.prototype = Object.create(Component.prototype);
Div.prototype.constructor = Div;

function Form() {
  //creamos la función form para poder crear formularios con pocas lineas de codigo
  Component.call(this, "form");
}

Form.prototype = Object.create(Component.prototype);
Form.prototype.constructor = Form;

Form.prototype.addSubmitListener = function (callback) {
  this.container.addEventListener("submit", callback);
};

function Input() {
  //creamos funcion input para crear inputs
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

function Button() {
  //creamos funcion constructora de button
  Component.call(this, "button");
}

Button.prototype = Object.create(Component.prototype);
Button.prototype.constructor = Button;

Button.prototype.setType = function (type) {
  this.container.type = type;
};

Button.prototype.setText = function (text) {
  //creamos funcion para poner texto a un button
  this.container.textContent = text;
};

function Heading(level) {
  //creamos funcion para heading con su level correspondiente
  Component.call(this, "h" + level);
}

Heading.prototype = Object.create(Component.prototype);
Heading.prototype.constructor = Heading;

Heading.prototype.setText = function (text) {
  //creamos texto para el heading
  this.container.textContent = text;
};

function Anchor() {
  //function que crea un anchor
  Component.call(this, "a");
}

Anchor.prototype = Object.create(Component.prototype);
Anchor.prototype.constructor = Anchor;

Anchor.prototype.setText = function (text) {
  //crear el texto del anchor
  this.container.textContent = text;
};

function Body() {
  //funcion para crear el body
  Component.call(this, "body");
}

Body.prototype = Object.create(Component.prototype);
Body.prototype.constructor = Body;

function Label() {
  //funcion para crear label
  Component.call(this, "label");
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.constructor = Label;

Label.prototype.setText = function (text) {
  this.container.textContent = text;
};

//creamos un body

const body = new Body();
document.body = body.container;

//LANDING

function Landing() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Landing");
  this.add(logo);

  var registerAnchor = new Anchor();
  registerAnchor.setText("Register");
  registerAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(register);
    }.bind(this)
  );
  this.add(registerAnchor);

  var orText = document.createTextNode(" or ");
  this.container.appendChild(orText);

  var loginAnchor = new Anchor();
  loginAnchor.setText("Login");
  loginAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(login);
    }.bind(this)
  );
  this.add(loginAnchor);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

var landing = new Landing();
body.add(landing);

//REGISTER

function Register() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Register");
  this.add(logo);

  //form

  var form = new Form();
  form.container.style.display = "flex";
  form.container.style.flexDirection = "column";
  form.container.style.gap = "15px";

  form.addSubmitListener(
    function (event) {
      event.preventDefault();

      console.log("register submit");

      var name = nameInput.getValue();
      var email = emailInput.getValue();
      var username = usernameInput.getValue();
      var password = passwordInput.getValue();

      console.log(name, email, username, password);

      body.remove(this);
      body.add(login);
    }.bind(this)
  );
  this.add(form);

  //name

  var nameLabel = new Label();
  nameLabel.setText("Name");
  form.add(nameLabel);

  var nameInput = new Input();
  nameInput.container.style.width = "200px";
  form.add(nameInput);

  //email

  var emailLabel = new Label();
  emailLabel.setText("E-mail");
  form.add(emailLabel);

  var emailInput = new Input();
  emailInput.container.style.width = "200px";
  emailInput.setType("email");
  form.add(emailInput);

  //username

  var usernameLabel = new Label();
  usernameLabel.setText("Username");
  form.add(usernameLabel);

  var usernameInput = new Input();
  usernameInput.container.style.width = "200px";
  usernameInput.setType("text");
  form.add(usernameInput);

  //password

  var passwordLabel = new Label();
  passwordLabel.setText("Password");
  form.add(passwordLabel);

  var passwordInput = new Input();
  passwordInput.container.style.width = "200px";
  passwordInput.setType("password");
  form.add(passwordInput);

  //submit

  var submitButton = new Button();
  submitButton.container.style.width = "200px";
  submitButton.setText("Register");
  submitButton.setType("submit");
  form.add(submitButton);

  //login button

  var loginAnchor = new Anchor();
  loginAnchor.setText("Login");
  loginAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(login);
    }.bind(this)
  );
  this.add(loginAnchor);
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

var register = new Register();

// // WIP boton de register al lado

// LOGIN

function Login() {
  Component.call(this, "div");

  var logo = new Heading(1);
  logo.setText("Login");
  this.add(logo);

  //form

  var form = new Form();
  form.container.style.display = "flex";
  form.container.style.flexDirection = "column";
  form.container.style.gap = "15px";

  form.addSubmitListener(
    function (event) {
      event.preventDefault();

      console.log("login submit");

      var username = usernameInput.getValue();
      var password = passwordInput.getValue();

      console.log(username, password);

      body.remove(this);
      body.add(home);
    }.bind(this)
  );
  this.add(form);

  //username

  var usernameLabel = new Label();
  usernameLabel.setText("Username");
  form.add(usernameLabel);

  var usernameInput = new Input();
  usernameInput.container.style.width = "200px";
  usernameInput.setType("text");
  form.add(usernameInput);

  //password

  var passwordLabel = new Label();
  passwordLabel.setText("Password");
  form.add(passwordLabel);

  var passwordInput = new Input();
  passwordInput.container.style.width = "200px";
  passwordInput.setType("password");
  form.add(passwordInput);

  // submit to LOGIN

  var submitButton = new Button();
  submitButton.setText("Login");
  submitButton.container.style.width = "200px";
  submitButton.setType("submit");
  form.add(submitButton);

  // anchor to Register

  var registerAnchor = new Anchor();
  registerAnchor.setText("Register");
  registerAnchor.addClickListener(
    function () {
      body.remove(this);
      body.add(register);
    }.bind(this))
  this.add(registerAnchor);
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;

var login = new Login()

//HOME

function Home() {
  Component.call(this, "div")

  var logo = new Heading(1);
  logo.setText("Home");
  this.add(logo);

  var welcome = new Heading(2);
  welcome.setText("Welcome to DEEPSTAGRAM");
  this.add(welcome);
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

var home = new Home();