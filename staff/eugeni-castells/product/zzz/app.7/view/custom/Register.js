function Register() {
  Component.call(this, "div");
  this.setStyle(style.screenStyle);

  //logo
  var logo = new Header("1", "Logo");
  this.add(logo);

  //form
  var form = new Form();
  form.setStyle(style.formStyle);

  form.addSubmitListener(
    function (event) {
      event.preventDefault();
      var registerInfo = {
        name: nameInput.getValue(),
        email: emailInput.getValue(),
        username: usernameInput.getValue(),
        password: passwordInput.getValue(),
      };
      try {
        logic.registerUser(registerInfo);
        form.clear();
        alert("user registered!");
        this.addSubmitListener();
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }.bind(this)
  );

  this.add(form);

  //form namefield
  var nameField = new Div();
  nameField.setStyle(style.formFieldStyle);
  form.add(nameField);

  //nameInputRegister
  var nameLabel = new Label("Name");
  nameField.add(nameLabel);

  var nameInput = new Input("text");
  nameField.add(nameInput);

  //form emailField
  var emailField = new Div();

  emailField.setStyle(style.formFieldStyle);

  form.add(emailField);

  //emailInputRegister
  var emailLabel = new Label("E-mail");
  emailField.add(emailLabel);

  var emailInput = new Input("text");

  emailField.add(emailInput);

  var usernameField = new Div();
  usernameField.setStyle(style.formFieldStyle);
  form.add(usernameField);

  var usernameLabel = new Label("Username");
  usernameField.add(usernameLabel);

  var usernameInput = new Input("text");
  usernameField.add(usernameInput);

  var passwordField = new Div();
  passwordField.setStyle(style.formFieldStyle);
  form.add(passwordField);

  var passwordLabel = new Label("Password");
  passwordField.add(passwordLabel);

  var passwordInput = new Input("password");
  passwordField.add(passwordInput);

  var buttonWrapper = new Div();
  form.add(buttonWrapper);
  buttonWrapper.setStyle(style.buttonWrapperStyle);

  //login
  var loginButton = new Button("Login");
  loginButton.setType("button");
  loginButton.setStyle(style.secondaryButtonStyle);
  loginButton.addClickListener(
    function () {
      form.clear();
      this.loginClickListener();
    }.bind(this)
  );
  buttonWrapper.add(loginButton);

  //register button
  var registerFormButton = new Button("Register");
  registerFormButton.type = "submit";
  registerFormButton.setStyle(style.mainButtonStyle);
  buttonWrapper.add(registerFormButton);
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

Register.prototype.addLoginClickListener = function (listener) {
  this.loginClickListener = listener;
};

Register.prototype.addRegisterSubmitListener = function (listener) {
  this.addSubmitListener = listener;
};
