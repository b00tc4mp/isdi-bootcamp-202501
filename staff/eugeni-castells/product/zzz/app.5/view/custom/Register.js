function Register() {
  Component.call(this, "div");
  this.setStyle(screenStyle);

  //logo
  var logo = new Header("1", "Logo");
  this.add(logo);

  //form
  var form = new Form();
  form.setStyle(formStyle);

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
  nameField.setStyle(formFieldStyle);
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

  emailField.setStyle(formFieldStyle);

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
  usernameField.setStyle(formFieldStyle);
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
  passwordField.setStyle(formFieldStyle);
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
  buttonWrapper.setStyle(buttonWrapperStyle);

  //login
  var loginButton = new Button("Login");
  loginButton.setType("reset");
  loginButton.setStyle(secondaryButtonStyle);
  buttonWrapper.add(loginButton);

  loginButton.clickListener(
    function () {
      handleClickNavigation(register, login);
    }.bind(this)
  );

  //register button
  var registerFormButton = new Button("Register");
  registerFormButton.type = "submit";
  registerFormButton.setStyle(mainButtonStyle);
  buttonWrapper.add(registerFormButton);
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;
