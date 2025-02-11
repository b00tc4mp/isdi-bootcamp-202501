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

    this.registerAnchor = registerAnchor

    this.add(registerAnchor);
  }
  
  Login.prototype = Object.create(Component.prototype);
  Login.prototype.constructor = Login;

  Login.prototype.addAnchorListener = function(listener) {
    this.registerAnchor.addClickListener(listener)
  }