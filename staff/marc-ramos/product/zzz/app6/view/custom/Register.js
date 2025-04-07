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

        this.registerSubmitListener()

      }.bind(this));
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
    
    this.loginAnchor = loginAnchor

    this.add(loginAnchor)
  }
  
  Register.prototype = Object.create(Component.prototype);
  Register.prototype.constructor = Register;

  Register.prototype.addLoginSubmit = function(listener) {
    this.registerSubmitListener = listener
  }

  Register.prototype.addLoginClickListener = function(listener) {
    this.loginAnchor.addClickListener(listener)
  }