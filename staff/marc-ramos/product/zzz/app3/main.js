console.clear();

// pagina landing donde vamos a ver el logo h1, un link (register), un texto (or) y otro link (login)

function Component(container) {
  this.container = container;
}

//LANDING

var landing = new Component(document.createElement("div"));
landing.mount = function () {
  document.body.appendChild(this.container);

  var logo = document.createElement("h1");
  logo.textContent = "Landing";
  this.container.appendChild(logo);

  var registerAnchor = document.createElement("a");
  registerAnchor.textContent = "Register";
  registerAnchor.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(register.container);
    }.bind(this)
  );
  this.container.appendChild(registerAnchor);

  var orText = document.createTextNode(" or ");
  this.container.appendChild(orText);

  var loginAnchor = document.createElement("a");
  loginAnchor.textContent = "Login";
  loginAnchor.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(login.container);
    }.bind(this)
  );
  this.container.appendChild(loginAnchor);
};

// REGISTER

var register = new Component(document.createElement("div"));
register.mount = function () {
  var logo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
  logo.textContent = "Register";
  this.container.appendChild(logo);

  //form
  var form = document.createElement("form");
  this.container.appendChild(form);

  //input name

  this.container.appendChild(form);
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "15px";

  var nameLabel = document.createElement("label");
  nameLabel.textContent = "Name";
  form.appendChild(nameLabel);

  var nameInput = document.createElement("input");
  nameInput.style.width = "200px";
  form.appendChild(nameInput);

  //input e-mail

  var emailLabel = document.createElement("label");
  emailLabel.textContent = "E-mail";
  form.appendChild(emailLabel);

  var emailInput = document.createElement("input");
  emailInput.style.width = "200px";
  form.appendChild(emailInput);

  // input Username

  var usernameLabel = document.createElement("label");
  usernameLabel.textContent = "Username";
  form.appendChild(usernameLabel);

  var usernameInput = document.createElement("input");
  usernameInput.style.width = "200px";
  form.appendChild(usernameInput);

  //input password

  var passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Password";
  form.appendChild(passwordLabel);

  var passwordInput = document.createElement("input");
  passwordInput.style.width = "200px";
  form.appendChild(passwordInput);

  //hipervinculo login

  var loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(login.container);
    }.bind(this)
  );
  this.container.appendChild(loginButton);
};

// WIP boton de register al lado

// LOGIN

var login = new Component(document.createElement("div"));
login.mount = function () {
  this.container.style.display = "flex";
  this.container.style.flexDirection = "column";
  this.container.style.gap = "15px";

  var logo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
  logo.textContent = "Login";
  this.container.appendChild(logo);

  var form = document.createElement("form"); //form para meter elementos dentro
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "15px";
  this.container.appendChild(form);

  // input Username
  var usernameLabel = document.createElement("label");
  form.appendChild(usernameLabel);
  usernameLabel.textContent = "Username";

  var usernameInput = document.createElement("input");
  usernameInput.style.width = "200px";
  form.appendChild(usernameInput);

  // input Password
  var passwordLabel = document.createElement("label");
  form.appendChild(passwordLabel);
  passwordLabel.textContent = "Password";

  var passwordInput = document.createElement("input");
  passwordInput.style.width = "200px";
  form.appendChild(passwordInput);

  //WIP submit

  //boton enter

  var homeButton = document.createElement("button");
  homeButton.textContent = "Enter";
  homeButton.style.width = "200px";
  homeButton.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(home.container);
    }.bind(this)
  );
  this.container.appendChild(homeButton);
};

//home

var home = new Component(document.createElement("div"));
home.mount = function () {
  var logo = document.createElement("h1");
  logo.textContent = "Home";
  this.container.appendChild(logo);

  //Boton de logout

  var logoutAnchor = document.createElement("a");
  logoutAnchor.textContent = "Logout";
  logoutAnchor.addEventListener(
    "click",
    function () {
      document.body.removeChild(this.container);
      document.body.appendChild(landing.container);
    }.bind(this)
  );
  this.container.appendChild(logoutAnchor);
};

landing.mount();
register.mount();
login.mount();
home.mount();
