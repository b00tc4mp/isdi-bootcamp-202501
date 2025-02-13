function Home() {
    Component.call(this, "div")
  
    var logo = new Heading(1);
    logo.setText("Home");
    this.add(logo);
  
    var welcome = new Heading(2);
    welcome.setText("Welcome to DEEPSTAGRAM");
    this.add(welcome);

    var logoutButton = new Button()
    logoutButton.setText('Logout')
    this.logoutButton = logoutButton
    this.add(logoutButton)
  }
  
  Home.prototype = Object.create(Component.prototype);
  Home.prototype.constructor = Home;

  Home.prototype.addHomeLogout = function(listener) {
    this.logoutButton.addClickListener(listener)
  }