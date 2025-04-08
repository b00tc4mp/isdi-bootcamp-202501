function Login() {
  Component.call(this, "div");
  this.setStyle(style.screenStyle);

  var logo = new Header("1", "Logo");
  this.add(logo);

  var form = new Form();
  form.setStyle(style.formStyle);
  form.submitListener(
    function (event) {
      event.preventDefault();

      var correctUsername = false;

      var correctPassword = false;

      for (var i = 0; i < data.users.length; i++) {
        if (data.loginFormData.username === data.users[i].username) {
          correctUsername = true;
        }

        if (data.loginFormData.password === data.users[i].password) {
          correctPassword = true;
        }
      }
      if (correctPassword && correctPassword) {
        alert("Login successful!");
        this.addSubmitListener();
      } else {
        alert("Login failed!");
      }
    }.bind(this)
  );
  this.add(form);

  var nameField = new Div();
  nameField.setStyle(style.formFieldStyle);
  form.add(nameField);

  var nameLabel = new Label("Username");
  nameField.add(nameLabel);

  var nameInput = new Input("text");
  nameField.add(nameInput);

  var passwordField = new Div();
  passwordField.setStyle(style.formFieldStyle);
  form.add(passwordField);

  var passwordLabel = new Label("Password");
  passwordField.add(passwordLabel);

  var passwordInput = new Input("password");
  passwordField.add(passwordInput);

  var buttonWrapper = new Div();
  buttonWrapper.setStyle(style.buttonWrapperStyle);
  form.add(buttonWrapper);

  var registerButton = new Button("Register");
  registerButton.setType("button");
  buttonWrapper.add(registerButton);
  this.registerButton = registerButton;

  var formButton = new Button("Login");
  formButton.setType("submit");
  buttonWrapper.add(formButton);
  formButton.setStyle(style.mainButtonStyle);
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;

Login.prototype.addRegisterClickListener = function (listener) {
  this.registerButton.addClickListener(listener);
};

Login.prototype.addLoginSubmitListener = function (listener) {
  this.addSubmitListener = listener;
};
