console.clear();

// pagina landing donde vamos a ver el logo h1, un link (register), un texto (or) y otro link (login)

//LANDING

var landing = {
  mount: function () {
    var container = document.createElement("div");
    landing.container = container;
    document.body.appendChild(container);

    var logo = document.createElement("h1");
    logo.textContent = "Landing";
    container.appendChild(logo);

    var registerAnchor = document.createElement("a");
    registerAnchor.textContent = "Register";
    registerAnchor.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(register.container);
    });
    container.appendChild(registerAnchor);

    var orText = document.createTextNode(" or ");
    container.appendChild(orText);

    var loginAnchor = document.createElement("a");
    loginAnchor.textContent = "Login";
    loginAnchor.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(login.container);
    });
    container.appendChild(loginAnchor);
  },
};

// REGISTER

var register = {
  mount: function () {
    var container = document.createElement("div");
    //document.body.appendChild(container);
    register.container = container;

    var logo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
    logo.textContent = "Register";
    container.appendChild(logo);

    //form
    var form = document.createElement("form");
    container.appendChild(form);

    //input name

    container.appendChild(form);
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
    loginButton.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(login.container);
    });
    container.appendChild(loginButton);
  },
};

// WIP boton de register al lado

// LOGIN

var login = {
  mount: function () {
    var container = document.createElement("div");
    //document.body.appendChild(container);
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "15px";

    login.container = container;

    var logo = document.createElement("h1"); //creo el logo arriba de la pagina como un texto h1
    logo.textContent = "Login";
    container.appendChild(logo);

    var form = document.createElement("form"); //form para meter elementos dentro
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.gap = "15px";
    container.appendChild(form);

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

    //boton enter

    var homeButton = document.createElement("button");
    homeButton.textContent = "Enter";
    homeButton.style.width = "200px";
    homeButton.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(home.container);
    });
    container.appendChild(homeButton);

    //homeButton.innerHTML = "Enter";
  },
};

//home

var home = {
  mount: function () {
    var container = document.createElement("div");
    //document.appendChild(container);
    home.container = container;
    //logo container

    var logo = document.createElement("h1");
    logo.textContent = "Home";
    container.appendChild(logo);

    //Boton de logout

    var logoutAnchor = document.createElement("a");
    logoutAnchor.textContent = "Logout";
    logoutAnchor.addEventListener("click", function () {
      document.body.removeChild(container);
      document.body.appendChild(landing.container);
    });
    container.appendChild(logoutAnchor);
  },
};

landing.mount();
register.mount();
login.mount();
home.mount();
