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