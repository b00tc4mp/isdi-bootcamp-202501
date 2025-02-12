function Login() {
  Component.call(this, "div");
  this.setStyle(screenStyle);

  //loginLogo
  var logo = new Header("1", "Logo");
  this.add(logo);

  //loginForm
  var form = new Form();
  form.setStyle(formStyle);
  form.submitListener(
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
  this.add(form);

  //form namefield
  var nameField = new Div();
  nameField.setStyle(formFieldStyle);
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
  passwordField.setStyle(formFieldStyle);
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
  buttonWrapper.setStyle(buttonWrapperStyle);
  form.add(buttonWrapper);

  //register button
  var registerButton = new Button("Register");
  registerButton.setType("button");
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
  formButton.setStyle(mainButtonStyle);
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;
